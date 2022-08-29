# Projet 7 de la formation Développeur Web d'OpenClassRooms
-----------------  
## groupomania
<p align="center">
<img width="380" height="173" ![groupomania] src = "https://github.com/sandrine42/Piiquante/blob/main/img/logo_piiquante.png" >
</p>

Le projet consiste à construire un réseau social interne pour les employés de Groupomania
Le but de cet outil est de faciliter les interactions entre collègues.
Le département RH de Groupomania a imaginé plusieurs fonctionnalités pour favoriser les échanges entre collègues.  
## Création d'un réseau social d’entreprise

### Technologies utilisées :  
#### Backend :
* "nodejs": "^15.3.0"  
* "axios": "^0.27.2"  
* "bcrypt": "^5.0.1"  
* "body-parser": "^1.20.0"  
* "cookie-parser": "^1.4.6" 
* "cors": "^2.8.5" 
* "dotenv": "^16.0.1"  
* "express": "^4.18.1"   
* "express-fileupload": "^1.4.0"    
* "helmet": "^6.0.0"  
* "js-cookie": "^3.0.1"  
* "loader": "^2.1.1"  
* "mongodb": "^4.8.1"  
* "mongoose": "^6.5.0"  
* "mongoose-unique-validator": "^3.1.0"  
* "multer": "^2.0.0-rc.1"  
* "nodemon": "^2.0.19"  
* "reactjs-popup": "^2.0.5"  
* "validator": "^13.7.0"  
* MongoDB Atlas  

Utilisation des variables d'environnement pour les coordonnées de la BDD :
fichier .env :  
`DB_URI=mongodb://<Adresse du serveur>:<Port>/<Nom base de donnees>`  
#### Frontend (client) :
* "nodejs": "^15.3.0"  
* "@reduxjs/toolkit": "^1.8.3"  
* "@testing-library/jest-dom": "^5.16.4"  
* "@testing-library/react": "^13.3.0"  
* "@testing-library/user-event": "^13.5.0"  
* "axios": "^0.27.2"  
* "dotenv": "^16.0.1"  
* "js-cookie": "^3.0.1"  
* "node-sass": "^7.0.1"  
* "react": "^18.2.0"  
* "react-dom": "^18.2.0"  
* "react-redux": "^8.0.2"  
* "react-router-dom": "^6.3.0"  
* "react-scripts": "^5.0.1"  
* "reactjs-popup": "^2.0.5"  
* "redux": "^4.2.0"  
* redux-devtools-extension": "^2.13.9"  
* "redux-logger": "^3.0.6"  
* "redux-thunk": "^2.4.1"  
* "web-vitals": "^2.1.4"  

### Pour que cela fonctionne :  

Retirez le code de l'application du repository du projet :  
(https://github.com/sandrine42/groupomania.git) et clonez le repository  

#### A. Frontend (client) :  
1. Ouvrez un terminal (Linux/Mac) ou une invite de commande/PowerShell (Windows)
2. Exécutez npm install (nodejs version 15.3.0) à partir du répertoire du projet (cd client)
3. Dans le repertoire client/src ajouter un fichier .env :  
4. REACT_APP_API_URL = 'http://localhost:5000/'  

#### B. Backend :
1. Ouvrez un terminal (Linux/Mac) ou une invite de commande/PowerShell (Windows)
2. Exécutez npm install (nodejs version 15.3.0) à partir du répertoire du projet (groupomania)
3. Dans le repertoire config ajouter un fichier .env :  
PORT=5000  
CLIENT_URL = http://localhost:3000  
`DB_URI=mongodb://<Adresse du serveur>:<Port>/<Nom base de donnees>`  
TOKEN_SECRET = (écrivez le token_secret que vous voulez)

vous devrez donc remplacer : `DB_URI=mongodb://<Adresse du serveur>:<Port>/<Nom base de donnees>`
par l'adresse de votre base de données  

#### C. Démarrer le serveur sur le dossier backend (groupomania) (http://localhost:5000  
  
* nodemon server

#### D. Démarrer le serveur sur le dossier frontend (client) (http://localhost:3000/)  

* npm start

