import { useEffect, useState } from "react";
import MainsItem from "../components/MainsItem";

import "./MainsList.css";

function MainsList () {
  const [mains, setMains] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [stage, setStage] = useState("preflop");

  useEffect(() => {
    fetch("http://localhost:4242/mainsList")
      .then((res) => res.json())
      .then((data) => {
        setMains(data);
      })
      .catch((error) => console.error(error));
  }, []);

  useEffect(() => {
    setStage("preflop");
  }, [currentIndex]);

  const handleNext = () => {
    if (currentIndex < mains.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <div className="mains-list-container">
      <h1>Focus Main</h1>
      
        {mains.length > 0 && (
            <MainsItem
              key={mains[currentIndex].id}
              id={mains[currentIndex].id}
              cards={mains[currentIndex].cards}
              stage={stage}
            />
        )}
        <div className="mains-list-buttons-mains">
          <button onClick={() => setStage("preflop")}>
            Pré-Flop
          </button>
          <button
            onClick={() => setStage("flop")}
            disabled={mains.length === 0}
          >
            Flop
          </button>
          <button
            onClick={() => setStage("turn")}
            disabled={mains.length === 0}
          >
            Turn
          </button>
          <button
            onClick={() => setStage("river")}
            disabled={mains.length === 0}
          >
            River
          </button>
          </div>
        <div className="mains-list-buttons-navigation">
          <button
          onClick={handlePrev}
          disabled={currentIndex === 0}
        >
          Main précédente
        </button>
        <button
          onClick={handleNext}
          disabled={currentIndex === mains.length - 1}
        >
          Main suivante
        </button>
        </div>
    </div>
  );
}

export default MainsList;