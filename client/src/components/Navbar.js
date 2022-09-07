//Navigation

//Imports

//Importation de React (bibliothèque de construction d'interfaces utilisateur)
import React, { useContext } from "react";

//Importation de useSelector pour récupérer une valeur du store Redux.
//Importation de useDispatch pour récupérer la fonction dispatch au sein de notre composant
//afin de pouvoir dispatch des actions Redux.
import { useSelector } from "react-redux";

//Importation du component NavLink de "navigation"
import { NavLink } from "react-router-dom";

//Importation de UidContext
//Le Contexte offre un moyen de faire passer des données à travers l’arborescence du composant
//sans avoir à passer manuellement les props à chaque niveau
//permet de staocker l'Id de l'utilisateur
import { UidContext } from "./AppContext";

//Importation du component Logout
import Logout from "./Log/Logout";

const Navbar = () => {
  const uid = useContext(UidContext);
  const userData = useSelector((state) => state.userReducer);

  return (
    <nav>
      <div className="nav-container">
        <div className="logo">
          <NavLink exact="true" to="/">
            <div className="logo">
              <img src="./img/icon-left-font.svg" alt="logo groupomania" />
            </div>
          </NavLink>
        </div>
        {uid ? (
          <ul>
            <li className="welcome">
              <NavLink exact="true" to="/profil">
              <img id="img_nav_profil" src={userData.picture} alt="user-pic" />
                <h5>Bienvenue {userData.pseudo}</h5>
                
              </NavLink>
            </li>
            <li id="left-nav-container">

<div className="icons">
        <div className="icons-bis">
          <NavLink to='/' exact ="true" active="true" className="active-left-nav">
            <img src="./img/icons/home.svg" alt="home"/>
          </NavLink>
          <br/>
          <NavLink to='/trending' exact ="true" active="true" className="active-left-nav">
            <img src="./img/icons/rocket.svg" alt="home"/>
          </NavLink>
          <br/>
          <NavLink to='/profil' exact ="true" active="true" className="active-left-nav">
            <img src="./img/icons/user.svg" alt="home"/>
          </NavLink>
        </div>
      </div>

            </li>
            <Logout />
          </ul>
        ) : (
          <ul>
          <li></li>
          <li></li>
          <li></li>
          <li id="picto_login">
              <NavLink exact="true" to="/profil">
                <img src="./img/icons/login.svg" alt="login"/>
              </NavLink>
          </li>
          </ul>
        )}
      </div>
    </nav>
  );
};

//Exportation de Navbar
export default Navbar;
