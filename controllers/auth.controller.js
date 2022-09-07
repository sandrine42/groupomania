//Importation du model utilisateur
const UserModel = require('../models/user.model');

// Importation du package "jsonwebtoken" qui permet la création et la verification des TOKEN
const jwt = require('jsonwebtoken');

//Importation du "model" des erreurs SignIn et SignUp
const { signUpErrors, signInErrors } = require('../utils/errors.utils');

//Importation de maxAge : nombre représentant les millisecondes de Date.now() pour l'expiration du cookie
const maxAge = 3 * 24 * 60 * 60 * 1000;

//Création et vérifiction d'un token via jsonwebtoken pour attribuer un token au moment de la connexion
const createToken = (id) => {
  return jwt.sign({id}, process.env.TOKEN_SECRET, {
    expiresIn: maxAge
  })
};

//Exportation de la fonction SignUp (inscription)
module.exports.signUp = async (req, res) => {
  const {pseudo, email, password} = req.body

  try {
    const user = await UserModel.create({pseudo, email, password });
    res.status(201).json({ user: user._id});
  }
  catch(err) {
    const errors = signUpErrors(err);
    res.status(200).send({ errors })
  }
}

//Exportation de la fonction SignIn (connection)
module.exports.signIn = async (req, res) => {
  const { email, password } = req.body

  try {
    const user = await UserModel.login(email, password);
    const token = createToken(user._id);
    res.cookie('jwt', token, { httpOnly: true, maxAge});
    res.status(200).json({ user: user._id})
  } catch (err){
    const errors = signInErrors(err);
    res.status(200).json({ errors });
  }
}

//Exportation de la fonction logout (déconnection) 
module.exports.logout = (req, res) => {
  res.cookie('jwt', '', { maxAge: 1 });
  res.redirect('/');
}