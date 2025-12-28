import { Link } from 'react-router';
import './Training.css';

function Training () {
  return (
  <section className='Training-section'>
    <div className='Training-title'>
      <h1>Training Room</h1>
      <p>Bienvenue dans la Training Room : un espace conçu pour booster ton jeu à travers des exercices ciblés, des routines efficaces et des entraînements pensés pour te faire progresser vite et bien.</p>
    </div>
    <ul className='Training-list'>
        <li>
            <h2><Link to="/MainsList">Focus Main</Link></h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptate, iusto veniam? Numquam ullam tenetur, soluta molestiae, quae mollitia excepturi ut error animi nesciunt asperiores eaque maxime sit ex assumenda itaque.</p>
        </li>
        <li>
            <h2><Link to="/MainsList">Exercice n°2</Link></h2>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem obcaecati, ad deleniti unde laudantium eaque vitae totam molestiae eos mollitia iste magnam, fuga ea. At commodi incidunt quisquam possimus laborum.</p>
        </li>
        <li>
            <h2><Link to="/MainsList">Exercice n°3</Link></h2>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde velit, saepe accusantium libero modi beatae officiis earum eveniet! Rem repudiandae, illo laboriosam eos alias voluptate! Cum amet suscipit veritatis esse!</p>
        </li>
    </ul>
  </section>
)
}

export default Training