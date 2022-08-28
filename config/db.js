//Importation de MONGOOSE
//bibliothèque de programmation orientée objet JavaScript
//qui crée une connexion entre MongoDB et l'environnement d'exécution JavaScript Node.js.
const mongoose = require('mongoose');

//Importation de path
// module de chemin (de nœud) de Node.js
// il fournit des fonctions utiles pour interagir avec les chemins de fichiers
const path = require('path')

//Importation de DOTENV
//module sans dépendance qui charge les variables d'environnement d'un fichier .env dans process.env.
//ce qui ici permet de masquer les informations de connexion à la base de données
require('dotenv').config({path :'./config/.env'});

// Connection à la base de données MongoDB avec MONGOOSE
// en utilisant DOTENV pour masquer les informations de connexion
//enregistrées dans .env et placées dans.gitignore
 mongoose
 .connect(process.env.DB_URI,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(()=>
    console.log("La connection a réussie avec MongoDb")
    )
    .catch ((err) =>
    console.log("La connexion a échouée avec MongoDB",err)
    )