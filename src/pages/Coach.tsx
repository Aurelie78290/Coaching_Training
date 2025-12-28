import photoCoach from "../assets/images/photoCoach.jpg";

import "./Coach.css";

function Coach () {
    return (
        <section className="section-vision-coach">
            <div className="vision-yourCoach">
                <h3 className="yourCoach-title">Ton coach</h3>
                <div className="vision-yourCoach-grid">
                <p className="yourCoach-content">Je suis Mickaël, alias Maître Canard, joueur de poker professionnel et coach chez Poker Académie depuis plus de dix ans. J’ai accompagné plus de 700 joueurs, dont plusieurs sont devenus professionnels. Ancien psychologue clinicien, j’ai choisi de quitter ma zone de confort pour me consacrer pleinement au poker, où j’évolue principalement en NL100. Mon approche repose sur une méthode structurée qui vise à rendre mes élèves autonomes, soutenue par une vraie vision du coaching : organisation, planification, supports variés et un travail mental essentiel pour progresser dans un univers où les émotions sont mises à rude épreuve.</p>
                <img src={photoCoach} alt="Ton coach, Maître Canard" className="vision-photoCoach" />
            </div>
            </div>
            <div className="vision-objectiveSite">
                <h3 className="objectiveSite-title">Objectifs de ce site</h3>
                <p className="objectiveSite-content">Ce site a été conçu pour t’aider à progresser pas à pas, grâce à une approche pédagogique simple, structurée et accessible. Tu y trouveras des exercices techniques pour renforcer ta compréhension du jeu, mais aussi des entraînements mentaux pour développer ton calme, ta discipline et ta confiance. L’objectif : t’accompagner dans une progression régulière et durable, en t’offrant des outils concrets pour prendre de meilleures décisions, analyser ton jeu et construire des habitudes solides, que tu sois débutant motivé ou joueur déjà expérimenté.</p>
            </div>
            <div className="vision-kangourouRole">
                <h3 className="kangourouRole-title">Ton rôle en tant que kangourou</h3>
                <p className="kangourouRole-content">En tant que kangourou, ton rôle est simple : avancer par petits bonds réguliers. Ici, pas besoin de sauter plus haut que les autres — l’important est de progresser à ton rythme, d’être curieux, d’explorer, et d’accepter que chaque saut, même les plus petits, te rapproche de ton meilleur jeu. Ton job : t’entraîner, observer, essayer, te relever après une mauvaise chute, et continuer. Je suis là pour te guider, mais c’est toi qui choisis la direction de tes bonds et l’énergie que tu y mets. Ensemble, on va construire un jeu plus solide, plus calme et plus confiant, un saut après l’autre.</p>
            </div>
        </section>
    )
}

export default Coach;