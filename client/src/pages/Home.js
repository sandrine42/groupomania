import React, { useContext } from "react";
import { UidContext } from "../components/AppContext";
import NewPostForm from "../components/Post/NewPostForm";
import Thread from "../components/Thread";
import Log from "../components/Log";
import Trends from "../components/Trends";
import FriendsHint from "../components/Profil/FriendsHint";

const Home = () => {
  const uid = useContext(UidContext);

  return (
    <div className="home">
       <div className="home-header">
        {uid ? <NewPostForm /> : <Log signin={true} signup={false} />}
        </div>
        <div className="main">

        <Thread />
        <div className="right-side">
        <div className="right-side-container">
          <div className="wrapper">
            <Trends />
            {uid && <FriendsHint />}
          </div>
        </div>
      </div>
      </div>

    </div>
  );
};

export default Home;
