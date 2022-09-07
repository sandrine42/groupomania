//Importation du model des publication
const PostModel = require("../models/post.model");

//Importation du model utilisateur
const UserModel = require("../models/user.model");

//Importation du "model" des erreurs SignIn, et upload
const { uploadErrors } = require("../utils/errors.utils");

//Déclaration de la constante ObjectID de Types.ObjectId (mongoose)
//Un ObjectId est un type spécial généralement utilisé pour les identifiants uniques.
//Pour vérifier que le paramètre (Id) passé existe dans la base de données
const ObjectID = require("mongoose").Types.ObjectId;

//Importation du module Node fs ('file system') de Node permettant de créer, 
//de stocker, d'accéder, gérer et interagir avec le système de fichiers.
const fs = require("fs");

//Déclaration d'une constante promisify (util.promisify() method de nodejs)
//convertit une fonction basée sur le rappel en une fonction basée sur la promesse.
const { promisify } = require("util");

//Déclaration d'une constante pipeline pour la création et l'upload de l'image
//Permet de gérer le flux de lecture et d'écriture de l'image
const pipeline = promisify(require("stream").pipeline);

//Les posts (méthode CRUD)

//Exportation de la fonction readPost
module.exports.readPost = (req, res) => {
  PostModel.find((err, docs) => {
    if (!err) res.send(docs);
    else console.log("Error to get data : " + err);
//trier du plusrécent au plus ancien (pour l'affichage des posts)
  }).sort({ createdAt: -1 });
};

//Exportation de la fonction createPost
module.exports.createPost = async (req, res) => {
  let fileName;

  if (req.file !== null) {
    try {
      if (
        req.file.detectedMimeType != "image/jpg" &&
        req.file.detectedMimeType != "image/png" &&
        req.file.detectedMimeType != "image/jpeg"
      )
        throw Error("invalid file");

      if (req.file.size > 500000) throw Error("max size");
    } catch (err) {
      const errors = uploadErrors(err);
      return res.status(201).json({ errors });
    }
    fileName = req.body.posterId + Date.now() + ".jpg";

    await pipeline(
      req.file.stream,
      fs.createWriteStream(
        `${__dirname}/../client/public/uploads/posts/${fileName}`
      )
    );
  }

  const newPost = new PostModel({
    posterId: req.body.posterId,
    message: req.body.message,
    picture: req.file !== null ? "./uploads/posts/" + fileName : "",
    video: req.body.video,
    likers: [],
    comments: [],
  });

  try {
    const post = await newPost.save();
    return res.status(201).json(post);
  } catch (err) {
    return res.status(400).send(err);
  }
};

//Exportation de la fonction updatePost
module.exports.updatePost = (req, res) => {
  if (!ObjectID.isValid(req.params.id) && params_id == UserModel._id || UserModel.isAdmin)
    return res.status(400).send("ID unknown : " + req.params.id);

  const updatedRecord = {
    message: req.body.message,
  };
  PostModel.findByIdAndUpdate(
    req.params.id,
    { $set: updatedRecord },
    { new: true },
    (err, docs) => {
      if (!err) res.send(docs);
      else console.log("Update error : " + err);
    }
  );
};

//Exportation de la fonction deletePost
module.exports.deletePost = (req, res) => {
  if (!ObjectID.isValid(req.params.id) && params_id == UserModel._id || UserModel.isAdmin)
    return res.status(400).send("ID unknown : " + req.params.id);

  PostModel.findByIdAndRemove( req.params.id, (err, docs) => {
    if (!err) res.send(docs);
    else console.log("Delete error : " + err);
  });
};

//Les likes et unlikes

//Exportation de la fonction likePost
module.exports.likePost = async (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).json({ message: "ID unknown : " + req.params.id});

  try {
    let critere = { likers: req.body.id };
    await PostModel.findByIdAndUpdate(req.params.id, {$addToSet: critere}, { new: true })
      .then(data => UserModel.findByIdAndUpdate(req.body.id,{$addToSet: critere}, { new: true })
        .then(data => res.send(data))
        .catch(err => res.status(500).json({ message: err }))
      ).catch(err => res.status(500).json({ message: err }));
  } catch (err) {
    return res.status(400).json(err);
  }
};

//Exportation de la fonction unlikePost
module.exports.unlikePost = async (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).json({ message: "ID unknown : " + req.params.id});

  try {
    let critere = { likers: req.body.id };
    await PostModel.findByIdAndUpdate(req.params.id, {$pull: critere}, { new: true })
      .then(data => UserModel.findByIdAndUpdate(req.body.id,{$pull: critere}, { new: true })
        .then(data => res.send(data))
        .catch(err => res.status(500).json({ message: err }))
      ).catch(err => res.status(500).json({ message: err }));
  } catch (err) {
    return res.status(400).json(err);
  }
};

//Les commentaires

//Exportation de la fonction commentPost
module.exports.commentPost = (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);
  try {
    return PostModel.findByIdAndUpdate(
      req.params.id,
      {
        $push: {
          comments: {
            commenterId: req.body.commenterId,
            commenterPseudo: req.body.commenterPseudo,
            text: req.body.text,
            timestamp: new Date().getTime(),
          },
        },
      },
      { new: true })
            .then((data) => res.send(data))
            .catch((err) => res.status(500).send({ message: err }));
    } catch (err) {
        return res.status(400).send(err);
    }
};

//Exportation de la fonction editCommentPost
module.exports.editCommentPost = (req, res) => {
  if (!ObjectID.isValid(req.params.id)&& commenter_id == UserModel._id || UserModel.isAdmin)
    return res.status(400).send("ID unknown : " + req.params.id);
  try {
    return PostModel.findById(req.params.id, (err, docs) => {
      const theComment = docs.comments.find((comment) =>
        comment._id.equals(req.body.commentId)
      );

      if (!theComment) return res.status(404).send("Comment not found");
      theComment.text = req.body.text;

      return docs.save((err) => {
        if (!err) return res.status(200).send(docs);
        return res.status(500).send(err);
      });
    });
  } catch (err) {
    return res.status(400).send(err);
  }
};

//Exportation de la fonction deleteCommentPost
module.exports.deleteCommentPost = (req, res) => {
  if (!ObjectID.isValid(req.params.id) && commenter_id == UserModel._id || UserModel.isAdmin)
    return res.status(400).send("ID unknown : " + req.params.id);
  try {
    return PostModel.findByIdAndUpdate(
      req.params.id,
      {
        $pull: {
          comments: {
            _id: req.body.commentId,
          },
        },
      },
      { new: true })
            .then((data) => res.send(data))
            .catch((err) => res.status(500).send({ message: err }));
    } catch (err) {
        return res.status(400).send(err);
    }
};