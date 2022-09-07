//Infinite Scrolling
//Le défilement infini est un mécanisme qui affiche les données en fonction
//d'un événement de défilement sans fin et charge les données uniquement
//selon les besoins pour éviter les problèmes de performances critiques.


//Imports

//Importation de React (bibliothèque de construction d'interfaces utilisateur)
import React, { useEffect, useState } from "react";

//Importation de useSelector pour récupérer une valeur du store Redux.
//Importation de useDispatch pour récupérer la fonction dispatch au sein de notre composant
//afin de pouvoir dispatch des actions Redux.
import { useDispatch, useSelector } from "react-redux";

//Importation de getTrends (actions)
import { getPosts } from "../actions/post.actions";

//Importation du component Card
import Card from "./Post/Card";

//Importation de IsEmpty, fonction pour pour déterminer si une value est vide ou pas
import { isEmpty } from "./Utils";

const Thread = () => {
  const [loadPost, setLoadPost] = useState(true);
  const [count, setCount] = useState(5);
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.postReducer);

  //Si on est en bas de la page avec le scroll
  const loadMore = () => {
    if (window.innerHeight + document.documentElement.scrollTop + 1 > document.scrollingElement.scrollHeight) {
      setLoadPost(true);
    }
  }
// loadPost etcount = useState 5 sont relancés,
//et on incrémente de 5 posts avant de relancer la fonction
  useEffect(() => {
    if (loadPost) {
      dispatch(getPosts(count));
      setLoadPost(false);
      setCount(count + 5);
    }

    window.addEventListener('scroll', loadMore);
    return () => window.removeEventListener('scroll', loadMore);
  }, [loadPost, dispatch, count]);

  return (
    <div className="thread-container">
      <ul>
        {!isEmpty(posts[0]) &&
          posts.map((post) => {
            return <Card post={post} key={post._id} />;
          })}
      </ul>
    </div>
  );
};

//Exportation de Thread
export default Thread;
