import { Link } from "react-router";
import { useState } from "react";
import Sign from "../assets/images/home-sign.png";

import "./Home.css";

type User = {
  id: number;
  email: string;
  is_admin: boolean;
};

function Home () {
  const [user, setUser] = useState(null as User | null);
    return (
      <>
        <section className="home-container">
          <img src={Sign} alt="Alerte présence de kangourous" className="home-sign" />
          <div className="home-presentation">
            <h1 className="home-title">Bienvenue à toi, cher kangourou !</h1>
            <p>Si tu as bondi jusque-là, c'est que tu veux comprendre ton jeu, travailler ton mental et progresser à ton rythme.</p>
            <p>Ce site est ton terrain d'entraînement : un espace simple, clair et bienveillant, où tu peux pratiquer chaque jour pour devenir plus solide techniquement et mentalement.</p>
            <p>Rien de magique, juste de la méthode, de la régularité... et un coach pour t'accompagner dans chaque saut.</p>
            {/* <Link to="/Training">
              <button className="home-cta">Je m'entraîne 💰</button>
            </Link> */}
            {user == null ? (
            <>
                <Link to="/login">Je me connecte</Link>
                <Link to="/register">Je ne suis pas inscrit</Link>
            </>
          ) : (
              <button
                type="button"
                className="home-cta"
                onClick={() => {
                  setUser(null);
                }}
              >
                Logout
              </button>
          )}
          </div>   
        </section>
      </>
    )
}

export default Home