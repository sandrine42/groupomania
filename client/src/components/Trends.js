//Les tendances (posts les plus likés)

//Imports

//Importation de React (bibliothèque de construction d'interfaces utilisateur)
import React, { useEffect } from "react";

//Importation de useSelector pour récupérer une valeur du store Redux.
//Importation de useDispatch pour récupérer la fonction dispatch au sein de notre composant
//afin de pouvoir dispatch des actions Redux.
import { useDispatch, useSelector } from "react-redux";

//Importation de getTrends (actions)
import { getTrends } from "../actions/post.actions";

//Importation de IsEmpty, fonction pour pour déterminer si une value est vide ou pas
import { isEmpty } from "./Utils";

//Importation du component NavLink de "navigation"
import { NavLink } from "react-router-dom";

const Trends = () => {
  const posts = useSelector((state) => state.allPostsReducer);
  const usersData = useSelector((state) => state.usersReducer);
  const trendList = useSelector((state) => state.trendingReducer);
  const dispatch = useDispatch();

  //Fonction pour calculer les posts les plus likés
  //Avec un array postArr pour faire le tri du plus liké au moins liké
  //Et en afficher que 3
  useEffect(() => {
    if (!isEmpty(posts[0])) {
      const postsArr = Object.keys(posts).map((i) => posts[i]);
      let sortedArray = postsArr.sort((a, b) => {
        return b.likers.length - a.likers.length;
      });
      sortedArray.length = 3;
      dispatch(getTrends(sortedArray));
    }
  }, [posts, dispatch]);

  return (
    <div className="trending-container">
      <h4>Les tendances</h4>
      <NavLink exact ="true" to="/trending">
        <ul>
          {trendList.length &&
            trendList.map((post) => {
              return (
                <li key={post._id}>
                  <div>
                    {post.picture && <img src={post.picture} alt="post-pic" />}
                    {post.video && (
                      <iframe
                        src={post.video}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        title={post._id}
                      ></iframe>
                    )}
                    {isEmpty(post.picture) && isEmpty(post.video) && (
                      <img src={usersData[0] && usersData.map((user) => {
                        if (user._id === post.posterId) {
                          return user.picture;
                        } else return null;
                      })
                      .join("")
                    } alt="profil-pic"/>
                    )}
                  </div>
                  <div className="trend-content">
                    <p>{post.message}</p>
                    <span>Lire</span>
                  </div>
                </li>
              );
            })}
        </ul>
      </NavLink>
    </div>
  );
};

//Exportation de Trends
export default Trends;
