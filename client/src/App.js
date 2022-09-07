//Imports

//Importation de React avec useState et useEffect : 
//useState (Hook d’état) permet d’ajouter l’état local React à des fonctions composants.

//useEffect (Hook d’effet) permet l’exécution d’effets de bord dans les fonctions composants

//Les Hooks sont des fonctions qui permettent de « se brancher »
//sur la gestion d’état local et de cycle de vie de React depuis des fonctions composants.
import React, { useEffect, useState } from "react";

//Importation des routes (navigation)
import Routes from "./components/Routes";

//Importation de UidContext
//Le Contexte offre un moyen de faire passer des données à travers l’arborescence du composant
//sans avoir à passer manuellement les props à chaque niveau
//permet de staocker l'Id de l'utilisateur
import { UidContext } from "./components/AppContext";

//Importation de axios
//Axios est une librairie cliente HTTP qui vous permet de faire des requêtes à une route donnée
import axios from "axios";

//Importation de useDispatch qui permet de récupérer la fonction dispatch
//au sein de notre composant afin de pouvoir dispatch des actions Redux.
import { useDispatch } from "react-redux";

//Importation de l'action getUser pour avoir les données de l'utilisateur
import { getUser } from "./actions/user.actions";

//Déclaration de la fonction App
const App = () => {
  const [uid, setUid] = useState(null);
  const dispatch = useDispatch();
//Contrôle du token de l'utilisateur à chaque fois qu'on appelle App
  useEffect(() => {
    const fetchToken = async () => {
      await axios({
        method: "get",
        url: `${process.env.REACT_APP_API_URL}jwtid`,
        withCredentials: true,
      })
        .then((res) => {
          setUid(res.data);
        })
        .catch((err) => console.log("No token"));
    };
    fetchToken();

    if (uid) dispatch(getUser(uid));
  }, [uid, dispatch]);
  

  return (
    <UidContext.Provider value={uid}>
      <Routes />
    </UidContext.Provider>
  )
}

//Exportation de App
//La valeur par défaut export est utilisée pour exporter une seule classe,
//primitive ou fonction à partir d’un module.
export default App;
