//Importation de axios
//Axios est une librairie cliente HTTP qui vous permet de faire des requêtes à une route donnée
import axios from "axios";

//Exportation des actions (sorte de bibliothèque de toutes les actions)

//Exportation de GET_USER pour les données de l'utilisateur
export const GET_USER = "GET_USER";

//Exportation de UPLOAD_PICTURE pour l'upload de l'image de profil
export const UPLOAD_PICTURE = "UPLOAD_PICTURE";

//Exportation de UPDATE_BIO pour l'update de la bio
export const UPDATE_BIO = "UPDATE_BIO";

//Exportation de FOLLOW_USER pour le "suivi" d'un autre utilisateur
export const FOLLOW_USER = "FOLLOW_USER";

//Exportation de UNFOLLOW_USER pour "l'arrêt du suivi" d'un autre utilisateur
export const UNFOLLOW_USER = "UNFOLLOW_USER";

//Exportation de GET_USER_ERRORS pour le traitement des erreurs
export const GET_USER_ERRORS = "GET_USER_ERRORS";

//Action qui permet de récupérer les données de l'utilisateur et de les envoyer au reducer
export const getUser = (uid) => {
  return (dispatch) => {
    return axios
      .get(`${process.env.REACT_APP_API_URL}api/user/${uid}`)
      .then((res) => {
        dispatch({ type: GET_USER, payload: res.data });
      })
      .catch((err) => console.log(err));
  };
};

//Action qui permet de récupérer les données de l'image de profil de l'utilisateur
//et de les envoyer au reducer
export const uploadPicture = (data, id) => {
  return (dispatch) => {
    return axios
    //envoi de la data au backend
      .post(`${process.env.REACT_APP_API_URL}api/user/upload`, data)
      .then((res) => {
        if (res.data.errors) {
          dispatch({ type: GET_USER_ERRORS, payload: res.data.errors });
        } else {
          dispatch({ type: GET_USER_ERRORS, payload: "" });
          return axios
          //Récupération du chemein de l'image
            .get(`${process.env.REACT_APP_API_URL}api/user/${id}`)
            .then((res) => {
          //Changement du chemin de l'image
              dispatch({ type: UPLOAD_PICTURE, payload: res.data.picture });

            });
        }
      })
      .catch((err) => console.log(err));
  };
};

//Action qui permet de récupérer les données de bio de l'utilisateur et de les envoyer au reducer
export const updateBio = (userId, bio) => {
  return (dispatch) => {
    return axios({
      method: "put",
      url: `${process.env.REACT_APP_API_URL}api/user/` + userId,
      data: { bio },
    })
      .then((res) => {
        dispatch({ type: UPDATE_BIO, payload: bio });
      })
      .catch((err) => console.log(err));
  };
};

//Action qui permet de récupérer les données de followUser de l'utilisateur et de les envoyer au reducer
export const followUser = (followerId, idToFollow) => {
  return (dispatch) => {
    return axios({
      method: "patch",
      url: `${process.env.REACT_APP_API_URL}api/user/follow/` + followerId,
      data: { idToFollow },
    })
      .then((res) => {
        dispatch({ type: FOLLOW_USER, payload: { idToFollow } });
      })
      .catch((err) => console.log(err));
  };
};

//Action qui permet de récupérer les données de unfollowUser de l'utilisateur et de les envoyer au reducer
export const unfollowUser = (followerId, idToUnfollow) => {
  return (dispatch) => {
    return axios({
      method: "patch",
      url: `${process.env.REACT_APP_API_URL}api/user/unfollow/` + followerId,
      data: { idToUnfollow },
    })
      .then((res) => {
        dispatch({ type: UNFOLLOW_USER, payload: { idToUnfollow } });
      })
      .catch((err) => console.log(err));
  };
};
