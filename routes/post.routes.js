//Création du routeur avec la méthode mise à disposition par Express (express.Router)
const router = require('express').Router();

//importation du controlleur des publication qui associe les fonctions aux différentes routes
const postController = require('../controllers/post.controller');

// Importation du middleware MULTER pour la gestion des images
const multer = require("multer");
const upload = multer();

// Création des différentes ROUTES publication de l'API
// posts
router.get('/', postController.readPost);
router.post('/', upload.single("file"), postController.createPost);
router.put('/:id', postController.updatePost);
router.delete('/:id', postController.deletePost);
router.patch('/like-post/:id', postController.likePost);
router.patch('/unlike-post/:id', postController.unlikePost);

// comments
router.patch('/comment-post/:id', postController.commentPost);
router.patch('/edit-comment-post/:id', postController.editCommentPost);
router.patch('/delete-comment-post/:id', postController.deleteCommentPost);

// Exportation du ROUTER vers app.js
module.exports = router;