//Importation de toutes les actions concernant l'utilisateur
import {
  FOLLOW_USER,
  GET_USER,
  UNFOLLOW_USER,
  UPDATE_BIO,
  UPLOAD_PICTURE,
} from "../actions/user.actions";

//State de base vide
const initialState = {};

//Exportation de la fonction usersReducer qui incrément le initialState avec toutes les données de l'utilisateur
//qui seront accessibles par tous les components de l'appli
//...state permet de récupérer les données déjà existantes (ce qui permet de ne pas écraser
//les données quand on en renvoie mais de "compléter"
export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case GET_USER:
      return action.payload;
    case UPLOAD_PICTURE:
      return {
        ...state,
        picture: action.payload,
      };
    case UPDATE_BIO:
      return {
        ...state,
        bio: action.payload,
      };
    case FOLLOW_USER:
      return {
        ...state,
        following: [action.payload.idToFollow, ...state.following],
      };
    case UNFOLLOW_USER:
      return {
        ...state,
        following: state.following.filter(
          (id) => id !== action.payload.idToUnfollow
        ),
      };
    default:
      return state;
  }
}
