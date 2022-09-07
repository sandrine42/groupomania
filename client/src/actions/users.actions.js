//Importation de axios
//Axios est une librairie cliente HTTP qui vous permet de faire des requêtes à une route donnée
import axios from "axios";

//Exportation de GET_USERS pour les données de tous les utilisateurs
export const GET_USERS = "GET_USERS";

//Action qui permet de récupérer les données de tous les utilisateurs et de les envoyer au reducer
export const getUsers = () => {
  return (dispatch) => {
    return axios
      .get(`${process.env.REACT_APP_API_URL}api/user`)
      .then((res) => {
        dispatch({ type: GET_USERS, payload: res.data });
      })
      .catch((err) => console.log(err));
  };
};
