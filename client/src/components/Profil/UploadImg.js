//Upload de l'image de profil

//Imports

//Importation de React (bibliothèque de construction d'interfaces utilisateur)
import React, { useState } from "react";

//Importation de useSelector pour récupérer une valeur du store Redux.
//Importation de useDispatch pour récupérer la fonction dispatch au sein de notre composant
//afin de pouvoir dispatch des actions Redux.
import { useDispatch, useSelector } from "react-redux";

//Importation de uploadPicture (actions)
import { uploadPicture } from "../../actions/user.actions";

const UploadImg = () => {
  const [file, setFile] = useState();
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.userReducer);

  const handlePicture = (e) => {
    e.preventDefault();
    //Crée un nouvel objet FormData
    const data = new FormData();
    //Ajoute une nouvelle valeur à une clé existante dans un objet FormData,
    //ou ajoute la clé si elle n'existe pas encore
    data.append("name", userData.pseudo);
    data.append("userId", userData._id);
    data.append("file", file);

    dispatch(uploadPicture(data, userData._id));
  };

  return (
    <form action="" onSubmit={handlePicture} className="upload-pic">
      <label htmlFor="file">Changer d'image
      <input
        type="file"
        id="file"
        name="file"
        accept=".jpg, .jpeg, .png"
        onChange={(e) => setFile(e.target.files[0])}
      />
      </label>
      <br/>
      <input type="submit" value="Envoyer" />
    </form>
  );
};

//Exportation de UploadImg
export default UploadImg;
