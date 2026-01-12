import { useEffect, useState } from "react";
import MainsItem from "../components/MainsItem";

import "./MainsList.css";

function MainsList() {
  const [mains, setMains] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [globalActionIndex, setGlobalActionIndex] = useState(-1);
  const [betsByPlayer, setBetsByPlayer] = useState<Record<number, number>>({});

  const currentMain = mains[currentIndex];

  /* =========================
     ORDONNANCEMENT DES JOUEURS
     ========================= */

  const numPlayers = currentMain?.players.length || 6;
  const buttonSeat = currentMain?.table.buttonSeat || 1; // seat du bouton

  // Ordre des sièges dans le sens horaire à partir du bouton
  const orderedSeats = Array.from({ length: numPlayers }, (_, i) => (buttonSeat + i) % numPlayers + 1);

  // Joueurs triés pour affichage et ordre d'action
  const playersOrder = orderedSeats.map(seat => currentMain?.players.find(p => p.seat === seat));

/* =========================
     FLATTEN DES ACTIONS
     ========================= */

  // Toutes les actions concaténées dans l’ordre horaire
  const allActions = currentMain?.streets.flatMap(street =>
    street.actions
      .sort((a, b) => {
        const indexA = playersOrder.findIndex(p => p.id === a.playerId);
        const indexB = playersOrder.findIndex(p => p.id === b.playerId);
        return indexA - indexB;
      })
      .map(a => ({ ...a, street: street.name }))
  ) || [];

  const currentAction = globalActionIndex >= 0 ? allActions[globalActionIndex] : null;
  const stage = currentAction?.street || "preflop";

  // Index de l'action dans la street pour MainsItem
  const actionIndexInStage = currentMain?.streets
    .find(s => s.name === stage)
    ?.actions.findIndex(a => a.playerId === currentAction?.playerId && a.action === currentAction?.action) || 0;

/* =========================
     CALCUL DES MISES
     ========================= */

useEffect(() => {
  if (!currentMain) return;

  const bets: Record<number, number> = {};

  // Init
  currentMain.players.forEach(p => {
    bets[p.id] = 0;
  });

  // Blindes forcées
  const sbPlayer = currentMain.players.find(
    p => p.seat === currentMain.table.smallBlindSeat
  );
  const bbPlayer = currentMain.players.find(
    p => p.seat === currentMain.table.bigBlindSeat
  );

  if (sbPlayer) bets[sbPlayer.id] = currentMain.table.smallBlind;
  if (bbPlayer) bets[bbPlayer.id] = currentMain.table.bigBlind;

  // Actions progressives
  allActions.slice(0, globalActionIndex +1).forEach(action => {
    if (action.amount) {
      bets[action.playerId] += action.amount;
    }
  });

  setBetsByPlayer(bets);

}, [globalActionIndex, currentIndex, currentMain]);

const isHandFinished =
  globalActionIndex === allActions.length - 1;

  // Navigation actions
  const nextAction = () => {
    if (globalActionIndex < allActions.length - 1) setGlobalActionIndex(prev => prev + 1);
  };
  const prevAction = () => {
    if (globalActionIndex > 0) setGlobalActionIndex(globalActionIndex - 1);
  };

  // Reset main
  const resetMain = () => setGlobalActionIndex(-1);

  // Navigation mains
  const handleNextMain = () => {
    if (currentIndex < mains.length - 1) setCurrentIndex(currentIndex + 1);
  };
  const handlePrevMain = () => {
    if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
  };
  
  
  useEffect(() => {
    fetch("http://localhost:4242/api/mainsList")
      .then(res => res.json())
      .then(data => setMains(data))
      .catch(err => console.error(err));
    setGlobalActionIndex(0);
  }, [currentIndex]);

  const pot = Object.values(betsByPlayer).reduce(
  (total, bet) => total + bet,
  0
);

  return (
    <div className="mains-list-container">
      <h1 className="mains-list-title">Focus Main</h1>

      {currentMain && (
        <MainsItem
          key={currentMain.id}
          hand={currentMain}
          stage={stage}
          actionIndex={actionIndexInStage}
          playersOrder={playersOrder}
          currentAction={currentAction}
          smallBlindSeat={currentMain.table.smallBlindSeat}
          bigBlindSeat={currentMain.table.bigBlindSeat}
          buttonSeat={buttonSeat}
          betsByPlayer={betsByPlayer}
          pot={pot}
           winner={isHandFinished ? currentMain.winner : null}
        />
      )}

     <div className="mains-list-buttons">
      {/* Boutons stages */}
      <div className="mains-list-buttons-mains">
        {["preflop", "flop", "turn", "river"].map(s => (
          <button
            key={s}
            className={s === stage ? "active-stage" : ""}
            onClick={() => {
              const index = allActions.findIndex(a => a.street === s);
              if (index !== -1) setGlobalActionIndex(index);
            }}
          >
            {s.charAt(0).toUpperCase() + s.slice(1)}
          </button>
        ))}
      </div>

      {/* Boutons actions */}
      <div className="action-navigation">
        <button onClick={prevAction} disabled={globalActionIndex < 0} className="action-arrow">
          &lt;
        </button>
        <button onClick={nextAction} disabled={globalActionIndex >= allActions.length - 1} className="action-arrow">
          &gt;
        </button>
        <button onClick={resetMain} className="reset-button">
          🔄 Réinitialiser la main
        </button>
      </div>
      </div>

      {/* Navigation mains */}
      <div className="mains-list-buttons-navigation">
        <button onClick={handlePrevMain} disabled={currentIndex === 0}>
          Main précédente
        </button>
        <button onClick={handleNextMain} disabled={currentIndex >= mains.length - 1}>
          Main suivante
        </button>
      </div>
    </div>
  );
}

export default MainsList;