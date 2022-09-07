//Importation de toutes les actions concernant les posts
import { GET_ALL_POSTS } from "../actions/post.actions";

//State de base vide
const initialState = {};

//Exportation de la fonction allPostsReducer qui incrément le initialState avec toutes les données
//de tous les posts qui seront accessibles par tous les components de l'appli
export default function allPostsReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_POSTS:
      return action.payload
    default: 
      return state;
  }
}