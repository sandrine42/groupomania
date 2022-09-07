// Importation du package "jsonwebtoken" qui permet la création et la verification des TOKEN
//Les tokens d'authentification permettent aux utilisateurs de se connecter une seule fois
//à leur compte. Au moment de se connecter, ils recevront leur token et le renverront
//automatiquement à chaque requête par la suite.
//Ceci permettra au back-end de vérifier que la requête est authentifiée.
const jwt = require("jsonwebtoken");
//Importation du model utilisateur
const UserModel = require("../models/user.model");

//Exportation de la fonction checkUser
// Récupère le token de l'utilisateur, vérifie si il existe et le décode
module.exports.checkUser = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, process.env.TOKEN_SECRET, async (err, decodedToken) => {
      if (err) {
        res.locals.user = null;
        // res.cookie("jwt", "", { maxAge: 1 });
        next();
      } else {
        let user = await UserModel.findById(decodedToken.id);
        res.locals.user = user;
        next();
      }
    });
  } else {
    res.locals.user = null;
    next();
  }
};

//Exportation de la fonction requireAuth
module.exports.requireAuth = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, process.env.TOKEN_SECRET, async (err, decodedToken) => {
      if (err) {
        console.log(err);
        res.send(200).json('no token')
      } else {
        console.log(decodedToken.id);
        next();
      }
    });
  } else {
    console.log('No token');
  }
};
