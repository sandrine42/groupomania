import React, { useContext } from "react";
import Log from "../components/Log";
import { UidContext } from "../components/AppContext";
import UpdateProfil from "../components/Profil/UpdateProfil";

const Profil = () => {
  const uid = useContext(UidContext);

  return (
    <div className="profil-page">
      {uid ? (
        <UpdateProfil />
      ) : (
        <div className="log-container">
        <div className="img-container">
            <img src="./img/fond_home_network.svg" alt="img-log" />
            <h2>Communiquer pour mieux se développer !</h2>
          </div>
          <Log signin={false} signup={true} />
        </div>
      )}
    </div>
  );
};

export default Profil;
