import cardBack from "../assets/images/CardBack.png";
import "./MainsItem.css";

function MainsItem({ hand, stage, actionIndex, playersOrder, currentAction }) {
  const isRed = (card: string) => card.includes("♥") || card.includes("♦");

  const currentStreet = hand.streets.find(s => s.name === stage);
  const boardCards = currentStreet?.board || [];

  const visibleCount = { preflop: 0, flop: 3, turn: 4, river: 5 }[stage];
  const visibleCards = boardCards.slice(0, visibleCount);
  const hiddenCount = 5 - visibleCards.length;

  return (
    <li className="main-item">
      {/* Joueurs */}
      {playersOrder.map(player => {
        const isActive = currentAction?.playerId === player.id;
        const playerAction =
          isActive ? currentAction?.action + (currentAction.amount ? ` ${currentAction.amount}` : "") : "";

        return (
          <div
            key={player.id}
            className={`player player-${player.seat} ${isActive ? "active" : ""}`}
          >
            <span className="player-name">{player.name}</span>
            {playerAction && <span className="player-action">{playerAction}</span>}
          </div>
        );
      })}

      {/* Board */}
      <div className="card-back-container">
        {visibleCards.map((card, i) => (
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