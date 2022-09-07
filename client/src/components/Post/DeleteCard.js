//Effacer un post

//Imports

//Importation de React (bibliothèque de construction d'interfaces utilisateur)
import React from "react";

//Importation de useDispatch pour récupérer la fonction dispatch au sein de notre composant
//afin de pouvoir dispatch des actions Redux.
import { useDispatch } from "react-redux";

//Importation de deletePost (action)
import { deletePost } from "../../actions/post.actions";

const DeleteCard = (props) => {
  const dispatch = useDispatch();

  //Fonction deleteQuote (action)
  const deleteQuote = () => dispatch(deletePost(props.id));

  return (
    <div
      onClick={() => {
        if (window.confirm("Voulez-vous supprimer cet article ?")) {
          deleteQuote();
        }
      }}
    >
      <img src="./img/icons/trash.svg" alt="trash" />
    </div>
  );
};

//Exportation de DeleteCard
export default DeleteCard;
