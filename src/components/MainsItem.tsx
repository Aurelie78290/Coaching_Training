import cardBack from "../assets/images/CardBack.png";
import jeton from "../assets/images/jeton_player.png";
import badgeHero from "../assets/images/badge-hero.png";
import badgeVilain from "../assets/images/badge-vilain.png";
import "./MainsItem.css";
import { useEffect, useState } from "react";

type Props = {
  hand: any;
  stage: string;
  actionIndex: number;
  playersOrder: any[];
  currentAction: any;
  buttonSeat: number;
  smallBlindSeat: number;
  bigBlindSeat: number;
  betsByPlayer: Record<number, number>;
  pot: number;
  winner: { playerId: number; amount: number} | null;
};

function MainsItem({ hand, stage, actionIndex, playersOrder, currentAction, buttonSeat, smallBlindSeat, bigBlindSeat, betsByPlayer, pot, winner }: Props) {
  const [animatePot, setAnimatePot] = useState(false);
  const [displayPot, setDisplayPot] = useState(true);
  const isRed = (card: string) => card.includes("♥") || card.includes("♦");
  
  const betPositions: Record<number, React.CSSProperties> = {
  1: { top: "86%", left: "65%" },
  2: { top: "40%", left: "12%" },
  3: { top: "14%", left: "26%" },
  4: { top: "14%", left: "58%" },
  5: { top: "14%", left: "91%" },
  6: { top: "50%", left: "75%" },
  };

  
  const currentStreet = hand.streets.find(s => s.name === stage);
  const boardCards = currentStreet?.board || [];

  const visibleCount : Record<string, number> = {
    preflop: 0,
    flop: 3,
    turn: 4,
    river: 5,
  };

  const visibleCards = boardCards.slice(0, visibleCount[stage]);
  const hiddenCount = 5 - visibleCards.length;

  const winnerPlayer = playersOrder.find((p) => p.id === winner?.playerId);

  useEffect(() => {
    if (winner && pot > 0) {
      setAnimatePot(true);
      const timer = setTimeout(() => {
        setAnimatePot(false);
        setDisplayPot(false); // on enlève les jetons du centre
      }, 1200); // durée animation
      return () => clearTimeout(timer);
    } else {
      setAnimatePot(false);
      setDisplayPot(true);
    }
  }, [winner, pot]);

const seatVectors: Record<number, { x: number; y: number }> = {
  1: { x: 10, y: 205 },    // Hero (bas)
  2: { x: -160, y: 20 }, // gauche
  3: { x: -120, y: -80 },
  4: { x: 100, y: -40 },  // haut
  5: { x: 120, y: -80 },
  6: { x: 160, y: 40 },  // droite
};

const vector = winnerPlayer ? seatVectors[winnerPlayer.seat] : { x: 0, y: 0 };

  return (
    <li className="main-item">
      {/* Joueurs */}
      {playersOrder.map(player => {
        const isActive = currentAction?.playerId === player.id;
        
        const isSB = player.seat === smallBlindSeat;
        const isBB = player.seat === bigBlindSeat;
        const isDealer = player.seat === buttonSeat;
        const isHero = player.seat === 1;

        const stackInitial = player.stack;
        const bet = betsByPlayer[player.id] || 0;
        const currentStack = stackInitial - bet +
          (winnerPlayer?.id === player.id && !displayPot ? winner.amount : 0);
        
        const playerAction =
          isActive ? currentAction?.action + (currentAction.amount ? ` ${currentAction.amount}` : "") : "";
        
        return (
          <>
          {/* Badge hero/vilain */}

          
          {isHero && player.cards && (
              <div className="hero-cards">
                {player.cards.map((card: string, index: number) => (
                  <span
                    key={index}
                    className={`card hero-card ${card.includes("♥") || card.includes("♦") ? "red" : ""}`}
                  >
                    {card}
                  </span>
                ))}
              </div>
            )}
          <div
            key={player.id}
            className={`player player-${player.seat} ${isActive ? "active" : ""}`}
          >
            {player.seat === 1 && (
              <img src={badgeHero} alt="Hero" className="hero-icon" />
            )}
            {player.seat !== 1  && (
              <img src={badgeVilain} alt="Vilain" className="vilain-icon" />
            )}

            {isDealer && <span className="dealer-button">D</span>}
            <span className="player-name">{player.name}</span>
            
            <span className="player-stack">
              {currentStack} BB
            </span>
                        
            <div className="player-tags">
              {isSB && <span className="blind sb">SB</span>}
              {isBB && <span className="blind bb">BB</span>}
            </div>

            {isActive && currentAction && (
               <span className="player-action">
                 {currentAction.action}
                 {currentAction.amount ? ` ${currentAction.amount}` : ""}
               </span>
            )}
          </div>
          </>
        );
        
      })}
      

      <div className="bets-on-table">
        {playersOrder.map((player) => {
          const bet = betsByPlayer[player.id] || 0;

          if (!bet || bet === 0) return null;

          return (
            <span
              key={player.id}
              className="chip bet"
              style={betPositions[player.seat]}
            >
             <img src={jeton} alt="pot de chaque joueur" className="jeton"></img> {bet} BB
            </span>
          );
        })}
      </div>

      
{/* Pot central animé */}
      {displayPot && pot > 0 && (
  <div className="pot-center">
    <span className="pot-amount">POT : {pot} BB</span>
    {[...Array(Math.min(12, pot))].map((_, i) => (
      <img
        key={i}
        src={jeton}
        alt="jeton"
        className="chip-pot"
        style={{
          transform: animatePot
    ? `translate(${vector.x}px, ${vector.y}px)`
      : "translate(0, 0)",
    transition: "transform 1.2s cubic-bezier(0.2, 0.8, 0.2, 1)",
    transitionDelay: `${i * 0.05}s`,
        }}
      />
    ))}
  </div>
)}

      {/* Board */}
      <div className="card-back-container">
        {visibleCards.map((card:string, i: number) => (
          <span key={i} className={`card ${isRed(card) ? "red" : ""}`}>
            {card}
          </span>
        ))}
        {[...Array(hiddenCount)].map((_, i) => (
          <img key={i} src={cardBack} alt="Dos de carte" className="card-back" />
        ))}
      </div>
    </li>
  );
}


export default MainsItem;