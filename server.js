//importation du package http natif de Node
const http = require('http');

// Importation d'express
//framework pour construire des applications web basées sur Node.js
const express = require('express');

//Importation du Middleware qui permet de gérer la requête POST venant de l'application front-end,
//extrait le corps JSON, mis à disposition par le framework Express.
const bodyParser = require('body-parser');

// Importation du middleware cookie-parser
const cookieParser = require('cookie-parser');

//Importation des routes user et post
const userRoutes = require('./routes/user.routes');
const postRoutes = require('./routes/post.routes');

//Importation de DOTENV
//module sans dépendance qui charge les variables d'environnement d'un fichier .env dans process.env.
//ce qui ici permet de masquer les informations de connexion à la base de données
require('dotenv').config({path: './config/.env'});

// Importation de la configuration de la base de donnée MongoDB
require('./config/db');

//Importation de HELMET
//module qui aide à sécuriser les en-têtes HTTP renvoyés par les applications Express. 
const helmet = require('helmet');

// Importation du middleware d'authentification des utilisateurs
const {checkUser, requireAuth} = require('./middleware/auth.middleware');

//Importation du middleware erreurs CORS ( Cross Origin Resource Sharing)
const cors = require('cors');

//Importation de l'application sur le serveur
const app = express();

//Options du middleware erreurs CORS ( Cross Origin Resource Sharing)
const corsOptions = {
  origin: process.env.CLIENT_URL,
  credentials: true,
  'allowedHeaders': ['sessionId', 'Content-Type'],
  'exposedHeaders': ['sessionId'],
  'methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
  'preflightContinue': false,
}
// Activation du middleware Cors
app.use(cors(corsOptions));

// Activation du middleware Body Parser
//pour analyser l'application/json
app.use(bodyParser.json());
//pour analyser l'application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}));

//Activation du middleware cookie-parser 
//analyse les cookies attachés à l'objet de requête client.
app.use(cookieParser());

// Activation du middleware d'authentification à chaque requête get
app.get('*', checkUser);
app.get('/jwtid', requireAuth, (req, res) => {
  res.status(200).send(res.locals.user._id)
});

// Activation des routes
app.use('/api/user', userRoutes);
app.use('/api/post', postRoutes);

// Protection contre injection sql, xss
app.use(helmet());

// Renvoie d'un port valide
// NormalizePort renvoie un port valide,
//qu'il soit fourni sous la forme d'un numéro ou d'une chaîne

const normalizePort = val => {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    return val;
  }
  if (port >= 0) {
    return port;
  }
  return false;
};

// Si aucun port n'est fourni on écoutera sur le port 5000
const port = normalizePort(process.env.PORT || 5000);
app.set('port', port);

//Gestion des erreurs
// ErrorHandler recherche les différentes erreurs et les gère de manière appropriée
// Elle est ensuite enregistrée dans le serveur
const errorHandler = error => {
  if (error.syscall !== 'listen') {
    throw error;
  }
  const address = server.address();
  const bind = typeof address === 'string' ? 'pipe ' + address : 'port: ' + port;
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges.');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use.');
      process.exit(1);
      break;
    default:
      throw error;
  }
};

// création du serveur
const server = http.createServer(app);

server.on('error', errorHandler);
server.on('listening', () => {
  const address = server.address();
  const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + port;
  console.log('Listening on ' + bind);
});


// Le serveur écoute le port définit
server.listen(port);