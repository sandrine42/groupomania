//Imports

//Importation de React (bibliothèque de construction d'interfaces utilisateur)
import React from "react";

//Importation de ReactDOM (module react-dom fournit des méthodes spécifiques au DOM)
import ReactDOM from "react-dom/client";

//Importation de BrowserRouter (bibliothèque de routage (routing) standard dans React)
import { BrowserRouter } from 'react-router-dom';

//importation de l'application
import App from "./App";

//importation des feuilles de style
import "./styles/index.scss";

//Importation du store
//Magasin qui contient tout l'arbre d'état de notre application React
//Pour créer un store, importation de createStore à partir du paquet redux,
//Importation du réducteur passer en argument au store createStore(reducer)
import { legacy_createStore as createStore} from 'redux'

//importation de laz fonction d'assistance Provider à partir du package react-redux.
//Connection du store à React
import { Provider } from "react-redux";

//Importation de applyMiddleware de redux et thunk de redux-thunk
//pour gérer le code asynchrone

//Importation de middleware redux
//Les middlewares Redux permettent de changer le fonctionnement du store.
//Cela permet par exemple d’ajouter un système de logging,
//ou bien de faciliter la manipulation d’action asynchrone.

//Importation de applyMiddleware (amplificateurs de magasin)
//qui va enrichir un store en ajoutant une sorte de hook sur sa méthode dispatch
import { applyMiddleware} from "redux";

//Importation de thunkMiddleware
//Redux-thunk est un middleware qui aide à gérer le code asynchrone.
//Le middleware permet d'interagir avec les actions qui ont été envoyées
//au magasin avant qu'elles n'atteignent le réducteur.
import thunkMiddleware from 'redux-thunk';

//Importation de rootReducer (où se trouvent tous les reducers (index.js (reducers))
//Permet d'importer plusieurs réducteurs combinés
//en un seul (avec combineReducers) pour la gestion de l'état.
import rootReducer from "./reducers";

//Importation des requêtes (actions) traitées avec AXIOS des utilisateurs et des posts
import { getUsers } from "./actions/users.actions";
import { getPosts } from "./actions/post.actions";

// dev tools
import { composeWithDevTools } from "redux-devtools-extension";

//Store

// Configuration du store
const middleware = applyMiddleware(thunkMiddleware);

//Création du store
//composeWithDevTools : enlever en mode production
const store = createStore(rootReducer, {}, composeWithDevTools(middleware));

//Exportation du store
export default store;

//Dispatch déclenche le réducteur et exécute la tâche
//Tous les utilisateurs
store.dispatch(getUsers());
//Tous les posts
store.dispatch(getPosts());

// Create a root.
const container = document.getElementById('root');

const root = ReactDOM.createRoot(container);

//on enveloppe notre composant App avec Provider
//on passe comme props le store qui a pour valeur notre store actuel.
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);


