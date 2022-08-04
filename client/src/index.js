import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from 'react-router-dom';
import App from "./App";
import "./styles/index.scss";
import { Provider } from "react-redux";
import { legacy_createStore as createStore} from 'redux'
import { applyMiddleware} from "redux";
import thunkMiddleware from 'redux-thunk';
import rootReducer from "./reducers";
import { getUsers } from "./actions/users.actions";
// dev tools
import { composeWithDevTools } from "redux-devtools-extension";
import { getPosts } from "./actions/post.actions";

// Store setup

const middleware = applyMiddleware(thunkMiddleware);

const store = createStore(rootReducer, {}, composeWithDevTools(middleware));

export default store;

store.dispatch(getUsers());
store.dispatch(getPosts());

const container = document.getElementById('root');

// Create a root.
const root = ReactDOM.createRoot(container);


root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);


