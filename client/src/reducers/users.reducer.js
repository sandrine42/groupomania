//Importation de l'action GET_USERS
import { GET_USERS } from "../actions/users.actions";

//State de base vide
const initialState = {};

//Exportation de la fonction usersReducer
//qui incrément le initialState avec les données des utilisateurs
//qui seront accessibles par tous les components de l'appli
export default function usersReducer(state = initialState, action) {
  switch (action.type) {
    case GET_USERS:
      return action.payload;
    default:
      return state;
  }
}
