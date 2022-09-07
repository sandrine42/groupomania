//Importation de combineReducers qui permet d’organiser notre state en attribuant
//chaque partie du state à un sous-reducer différent.
import { combineReducers } from 'redux';

//Importation de userReducer
import userReducer from './user.reducer';

//Importation de usersReducer
import usersReducer from './users.reducer';

//Importation de postReducer
import postReducer from './post.reducer';

//Importation de errorReducer
import errorReducer from './error.reducer';

//Importation de allPostsReducer
import allPostsReducer from './allPosts.reducer';

//Importation de trendingReducer
import trendingReducer from './trending.reducer';


//Exportation par défaut de combineReducers (rootReducer dans index.js)
export default combineReducers({
  userReducer,
  usersReducer,
  postReducer,
  errorReducer,
  allPostsReducer,
  trendingReducer
});