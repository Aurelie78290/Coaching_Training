import cardBack from "../assets/images/CardBack.png";
import jeton from "../assets/images/jeton_player.png";
import "./MainsItem.css";

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
};

function MainsItem({ hand, stage, actionIndex, playersOrder, currentAction, buttonSeat, smallBlindSeat, bigBlindSeat, betsByPlayer, pot }: Props) {
  const isRed = (card: string) => card.includes("♥") || card.includes("♦");
  
  const betPositions: Record<number, React.CSSProperties> = {
  1: { top: "82%", left: "48%" },
  2: { top: "46%", left: "10%" },
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

  return (
    <li className="main-item">
      {/* Joueurs */}
      {playersOrder.map(player => {
        const isActive = currentAction?.playerId === player.id;
        const playerAction =
          isActive ? currentAction?.action + (currentAction.amount ? ` ${currentAction.amount}` : "") : "";
        const isSB = player.seat === smallBlindSeat;
        const isBB = player.seat === bigBlindSeat;
        const isDealer = player.seat === buttonSeat;

        const stackInitial = player.stack;
        const bet = betsByPlayer[player.id] || 0;
        const currentStack = stackInitial - bet;
        
        return (
          <div
            key={player.id}
            className={`player player-${player.seat} ${isActive ? "active" : ""}`}
          >
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

      {pot > 0 && (
  <div className="pot">
    <span className="pot-label">POT : {pot} BB </span>
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