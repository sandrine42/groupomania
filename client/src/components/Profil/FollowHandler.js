//Followers (abonnés), ceux qui vous suivent et following (abonnements), ceux que vous suivez

//Imports

//Importation de React (bibliothèque de construction d'interfaces utilisateur)
import React, { useEffect, useState } from "react";

//Importation de useSelector pour récupérer une valeur du store Redux.
//Importation de useDispatch pour récupérer la fonction dispatch au sein de notre composant
//afin de pouvoir dispatch des actions Redux.
import { useDispatch, useSelector } from "react-redux";

//Importation de followUser et unfollowUser (actions)
import { followUser, unfollowUser } from "../../actions/user.actions";

//Importation de IsEmpty, fonction pour pour déterminer si une value est vide ou pas
import { isEmpty } from "../Utils";

//Fonction FollowHandler
const FollowHandler = ({ idToFollow, type }) => {
  const userData = useSelector((state) => state.userReducer);
  const [isFollowed, setIsFollowed] = useState(false);
  const dispatch = useDispatch();

  //Fonction handleFollow
  const handleFollow = () => {
    dispatch(followUser(userData._id, idToFollow));
    setIsFollowed(true);
  };

  //Fonction handleUnfollow
  const handleUnfollow = () => {
    dispatch(unfollowUser(userData._id, idToFollow));
    setIsFollowed(false);
  };

  //Déclenche les fonctions handleFollow et handleUnfollow en fonctions des conditions
  useEffect(() => {
    if (!isEmpty(userData.following)) {
      if (userData.following.includes(idToFollow)) {
        setIsFollowed(true);
      } else setIsFollowed(false);
    }
  }, [userData, idToFollow]);

  return (
    <>
      {isFollowed && !isEmpty(userData) && (
        <span onClick={handleUnfollow}>
          {type === "suggestion" && <button className="unfollow-btn">Abonné</button>}
          {type === "card" && <img src="./img/icons/checked.svg" alt="checked"/>}
        </span>
      )}
      {isFollowed === false && !isEmpty(userData) && (
        <span onClick={handleFollow}>
          {type === "suggestion" && <button className="follow-btn">Suivre</button>}
          {type === "card" && <img src="./img/icons/check.svg" alt="check"/>}
        </span>
      )}
    </>
  );
};

//Exportation de FollowHandler
export default FollowHandler;
