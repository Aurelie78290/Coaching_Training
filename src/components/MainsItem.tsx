import cardBack from "../assets/images/CardBack.png";
import './MainsItem.css'

function MainsItem({ id, cards, stage }) {

  const isRed = (card) => card.includes("♥") || card.includes("♦");
  
  const visibleCount = {
    preflop: 0,
    flop: 3,
    turn: 4,
    river: 5,
  }[stage];

  const visibleCards = cards.slice(0,visibleCount);
  const hiddenCount = 5 - visibleCount;

  return (
    <li className="main-item">
      <div className="player player-one">
        <span className="player-name">Player 1</span>
      </div>
      <div className="player player-two">
        <span className="player-name">Player 2</span>
      </div>
      <div className="player player-three">
        <span className="player-name">Player 3</span>
      </div>
      <div className="player player-four">
        <span className="player-name">Player 4</span>
      </div>
      <div className="player player-five">
        <span className="player-name">Player 5</span>
      </div>
       <div className="player player-six">
        <span className="player-name">Player 6</span>
      </div>
      <div className="card-back-container">
          {visibleCards.map((card, i) => (
          <span
            key={i}
            className={`card ${isRed(card) ? "red" : ""}`}
          >
            {card}
          </span>
        ))}

          {[...Array(hiddenCount)].map((_, i) => (
        <img
          key={i}
          src={cardBack}
          alt="Dos de carte"
          className="card-back"
        />
          ))}
      </div>        
    </li>
  );
}

export default MainsItem;