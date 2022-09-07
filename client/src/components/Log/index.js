//Page "accueil" d'inscription et de connection

//Imports

//Importation de React (bibliothèque de construction d'interfaces utilisateur)
import React, { useState } from "react";

//Importation de SignInForm pour la connection
import SignInForm from "./SignInForm";

//Importation de SignInForm pour l'inscription'
import SignUpForm from "./SignUpForm";

const Log = ( props ) => {
  //Inscription (affichage différent en fonction de la page d'accueil ou de la page du fil d'actualité)
  const [signUpModal, setSignUpModal] = useState(props.signup);
  //Connection (affichage différent en fonction de la page d'accueil ou de la page du fil d'actualité)
  const [signInModal, setSignInModal] = useState(props.signin);

  //Fonction pour gérer les components signIn et singnUp
  const handleModals = (e) => {
    //Si 
    if (e.target.id === "register") {
      setSignInModal(false);
      setSignUpModal(true);
    } else if (e.target.id === "login") {
      setSignUpModal(false);
      setSignInModal(true);
    }
  };

  //Rendu (affichage)
  //Condition pour afficher soit le modéle d'inscription, soit de connection
  return (
    <div className="connection-form">
      <div className="form-container">
        <ul>
          <li
            onClick={handleModals}
            id="register"
            className={signUpModal ? "active-btn" : null}
          >
            S'inscrire
          </li>
          <li
            onClick={handleModals}
            id="login"
            className={signInModal ? "active-btn" : null}
          >
            Se connecter
          </li>
        </ul>
        {signUpModal && <SignUpForm />}
        {signInModal && <SignInForm />}
      </div>
    </div>
  );
};

//Exportation de Log
export default Log;
