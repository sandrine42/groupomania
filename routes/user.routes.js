//Création du routeur avec la méthode mise à disposition par Express (express.Router)
const router = require("express").Router();

//importation du controlleur d'authentification
const authController = require("../controllers/auth.controller");
//importation du controlleur utilisateur qui associe les fonctions aux différentes routes
const userController = require("../controllers/user.controller");
//importation du controlleur upload du profil utilisateur
const uploadController = require('../controllers/upload.controller');
// Importation du middleware MULTER pour la gestion des images
const multer = require("multer");
const upload = multer();

// Création des différentes ROUTES utilisateur de l'API

// auth
router.post("/register", authController.signUp);
router.post("/login", authController.signIn);
router.get("/logout", authController.logout);

// user DB
router.get("/", userController.getAllUsers);
router.get("/:id", userController.userInfo);
router.put("/:id", userController.updateUser);
router.delete("/:id", userController.deleteUser);
router.patch("/follow/:id", userController.follow);
router.patch("/unfollow/:id", userController.unfollow);

// upload
router.post("/upload", upload.single("file"), uploadController.uploadProfil);

// Exportation du ROUTER vers app.js
module.exports = router;

