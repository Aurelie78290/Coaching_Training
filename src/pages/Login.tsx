import { useRef, type FormEventHandler } from "react";

import { useNavigate } from "react-router";
import { useAuth } from "../contexts/AuthContext";

import "./Login.css";

type User = {
  id: number;
  email: string;
  is_admin: boolean;
};

function Login () {
  // Références pour les champs email et mot de passe
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const { login } = useAuth(); 
  
  // Hook pour la navigation
  const navigate = useNavigate();

  // Gestionnaire de soumission du formulaire
  const handleSubmit: FormEventHandler = async (event) => {
    event.preventDefault();

    try {
      // Appel à API pour demander une connexion
      const response = await fetch("http://localhost:4242/api/auth/login",
        {
          method: "post",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email:
              /* rendering process ensures the ref is defined before the form is submitted */
              (emailRef.current as HTMLInputElement).value,
            password:
              /* rendering process ensures the ref is defined before the form is submitted */
              (passwordRef.current as HTMLInputElement).value,
          }),
        },
      );
      // Redirection vers la page de connexion si la création réussit
      if (response.status === 200) {
        const user = await response.json();

        login(user);

        navigate("/");
      } else {
        // Log des détails de la réponse en cas d'échec
        console.info(response);
      }
    } catch (err) {
      // Log des erreurs possibles
      console.error(err);
    }
  };
  return (
    <form onSubmit={handleSubmit}>
        <div>
            <label htmlFor="email">Email</label>{" "}
            <input ref={emailRef} type="email" id="email" />
        </div>
        <div>
            <label htmlFor="password">Mot de passe</label>{" "}
            <input ref={passwordRef} type="password" id="password" />
        </div>
        <button type="submit" className="login-button">Se connecter</button>
    </form>
    );
}

export default Login;
