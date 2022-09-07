//Pour se déconnecter

//Imports

//Importation de React (bibliothèque de construction d'interfaces utilisateur)
import React from "react";

//Importation de React (bibliothèque de construction d'interfaces utilisateur)
import axios from "axios";

//Importation de cookie pour traiter les cookies
import cookie from "js-cookie";

//Permet de retirer le cookie du front
const Logout = () => {
  const removeCookie = (key) => {
    if (window !== "undefined") {
      cookie.remove(key, { expires: 1 });
    }
  };

  //Permet de retirer le cookie du back
  const logout = async () => {
    await axios({
      method: "get",
      url: `${process.env.REACT_APP_API_URL}api/user/logout`,
      withCredentials : true,
    })
      .then(() => removeCookie("jwt"))
      .catch((err) => console.log(err));
    
    window.location = "/";
  };

  //Rendu (affichage)
  return (
    <li id="picto_logout" onClick={logout}>
      <img src="./img/icons/logout.svg" alt="logout" />
    </li>
  );
};

//Exportation de Logout
export default Logout;
