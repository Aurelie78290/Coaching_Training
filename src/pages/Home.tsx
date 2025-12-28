import { Link } from "react-router";
import Sign from "../assets/images/home-sign.png";

import "./Home.css";

function Home () {
    return (
      <>
        <section className="home-container">
          <img src={Sign} alt="Alerte présence de kangourous" className="home-sign" />
          <div className="home-presentation">
            <h1 className="home-title">Bienvenue à toi, cher kangourou !</h1>
            <p>Si tu as bondi jusque-là, c'est que tu veux comprendre ton jeu, travailler ton mental et progresser à ton rythme.</p>
            <p>Ce site est ton terrain d'entraînement : un espace simple, clair et bienveillant, où tu peux pratiquer chaque jour pour devenir plus solide techniquement et mentalement.</p>
            <p>Rien de magique, juste de la méthode, de la régularité... et un coach pour t'accompagner dans chaque saut.</p>
            <Link to="/Training">
              <button className="home-cta">Je m'entraîne 💰</button>
            </Link>
          </div>   
        </section>
      </>
    )
}

export default Home