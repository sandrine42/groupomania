//Controller pour l'upload de l'image de profil

//Importation du model utilisateur
const UserModel = require("../models/user.model");

//Importation du module Node fs ('file system') de Node permettant de créer, 
//de stocker, d'accéder, gérer et interagir avec le système de fichiers.
const fs = require("fs");

//Déclaration d'une constante promisify (util.promisify() method de nodejs)
//convertit une fonction basée sur le rappel en une fonction basée sur la promesse.
const { promisify } = require("util");

//Déclaration d'une constante pipeline pour la création et l'upload de l'image
//Permet de gérer le flux de lecture et d'écriture de l'image
const pipeline = promisify(require("stream").pipeline);

//Importation du "model" des erreurs SignIn, et upload
const { uploadErrors } = require("../utils/errors.utils");

//Exportation de la fonction uploadProfil
module.exports.uploadProfil = async (req, res) => {
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
  const fileName = req.body.name + ".jpg";

  await pipeline(
    req.file.stream,
    fs.createWriteStream(
      `${__dirname}/../client/public/uploads/profil/${fileName}`
    )
  );

  try {
    await UserModel.findByIdAndUpdate(
      req.body.userId,
        { $set: { picture: "./uploads/profil/" + fileName } },
        { new: true, upsert: true, setDefaultsOnInsert: true })
        .then((data) => res.send(data))
        .catch((err) => res.status(500).send({ message: err }));
        
  } catch (err) {
    return res.status(500).send({ message: err });
  }
};
