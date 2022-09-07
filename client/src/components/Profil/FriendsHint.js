/* eslint-disable array-callback-return */

//Suggestion d'amis

//Imports

//Importation de React (bibliothèque de construction d'interfaces utilisateur)
import React, { useEffect, useState } from "react";

//Importation de useSelector pour récupérer une valeur du store Redux.
import { useSelector } from "react-redux";

//Importation de isEmpty pour verifier value (false ou true)
import { isEmpty } from "../Utils";

//Importation de FollowHandler pour verifier value (false ou true)
import FollowHandler from "./FollowHandler";

//Fonction FriendsHint pour proposer une liste d'amis que l'utilisateur ne suit pas encore
//Fonction avec un loader, q'u'on appelle une fois
const FriendsHint = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [playOnce, setPlayOnce] = useState(true);
  const [friendsHint, setFriendsHint] = useState([]);
  const userData = useSelector((state) => state.userReducer);
  const usersData = useSelector((state) => state.usersReducer);

  //Déclenche la fonction notFriendList (non suivi)
  useEffect(() => {
    const notFriendList = () => {
      //Tableau dans lequel se trouve toutes les suggestions d'amis
      let array = [];
      usersData.map((user) => {
      //Si Id de l'utilisateur est différente des données de l'utilisateur en cours
      //Pour que l'utilisateur ne puise pas s'ajouter lui-même
      //et que l'utilisateur ne suive pas déjà ces autres utilisateurs
        if (user._id !== userData._id && !user.followers.includes(userData._id))
        //On retourne un tableau avec les données trouvées en rapport avec la condition
        return array.push(user._id); 
      });
      //Triage du tableau pour ne pas avoir toujours les mêmes followers proposés
      //La fonction Math.random() renvoie un nombre flottant pseudo-aléatoire,
      //généré entre 0 (inclus) et 1 (exclu)”.
      //Et affichage du nombre de suggestion d'amis en fonction de la hauteur
      // de la partie visible de la fenêtre de navigation
      array.sort(() => 0.5 - Math.random());
      if (window.innerHeight > 780) {
        array.length = 5;
      } else if (window.innerHeight > 720) {
        array.length = 4;
      } else if (window.innerHeight > 615) {
        array.length = 3;
      } else if (window.innerHeight > 540) {
        array.length = 1;
      } else {
        array.length = 0;
      }
      setFriendsHint(array);
    };

    //Si playOnce(true), que usersData n'est pas vide, et que userData._id existe
    //alors lance la fonction notFriendList
    if (playOnce && !isEmpty(usersData[0]) && !isEmpty(userData._id)) {
      notFriendList();
      setIsLoading(false);
      setPlayOnce(false);
    }
  }, [usersData, userData, playOnce]);

  return (
    <div className="get-friends-container">
      <h4>Suggestions</h4>
      {isLoading ? (
        <div className="icon">
          <i className="fas fa-spinner fa-pulse"></i>
        </div>
      ) : (
        <ul>
          {friendsHint &&
            friendsHint.map((user) => {
              for (let i = 0; i < usersData.length; i++) {
                if (user === usersData[i]._id) {
                  return (
                    <li className="user-hint" key={user}>
                      <img src={usersData[i].picture} alt="user-pic" />
                      <p>{usersData[i].pseudo}</p>
                      <FollowHandler
                        idToFollow={usersData[i]._id}
                        type={"suggestion"}
                      />
                    </li>
                  );
                }
              }
            })}
        </ul>
      )}
    </div>
  );
};

//Exportation de FriendsHint
export default FriendsHint;
