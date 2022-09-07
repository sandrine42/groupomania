//Importation des actions concernant les erreurs
import { GET_POST_ERRORS } from "../actions/post.actions";
import { GET_USER_ERRORS } from "../actions/user.actions";

//State de base avec userError vide et postError vide
const initialState = { userError: [], postError: []};

//Exportation de la fonction errorReducer qui incrément le initialState avec toutes les données
// d'erreurs qui seront accessibles par tous les components de l'appli
export default function errorReducer(state = initialState, action) {
  switch (action.type) {
    case GET_POST_ERRORS:
      return {
        postError: action.payload,
        userError: []
      }
    case GET_USER_ERRORS:
      return {
        userError: action.payload,
        postError: []
      }
    default: 
      return state;
  }
}