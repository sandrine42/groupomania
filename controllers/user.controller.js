//Importation du model utilisateur
const UserModel = require("../models/user.model");

//Déclaration de la constante ObjectID de Types.ObjectId (mongoose)
//Un ObjectId est un type spécial généralement utilisé pour les identifiants uniques.
//Pour vérifier que le paramètre (Id) passé existe dans la base de données
const ObjectID = require("mongoose").Types.ObjectId;

//Les utilisateurs

//Exportation de la fonction getAllUsers
module.exports.getAllUsers = async (req, res) => {
  const users = await UserModel.find().select("-password");
  res.status(200).json(users);
};

//Exportation de la fonction userInfo
module.exports.userInfo = (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

  UserModel.findById(req.params.id, (err, docs) => {
    if (!err) res.send(docs);
    else console.log("ID unknown : " + err);
  }).select("-password");
};

//Exportation de la fonction updateUser
module.exports.updateUser = async (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

  try {
    await UserModel.findOneAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          bio: req.body.bio,
        },
      },
      { new: true, upsert: true, setDefaultsOnInsert: true })
      .then((data) => res.send(data))
      .catch((err) => res.status(500).send({ message: err }));
  } catch (err) {
    return res.status(500).json({ message: err });
  }
};

//Exportation de la fonction deleteUser
module.exports.deleteUser = async (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

  try {
    await UserModel.remove({ _id: req.params.id }).exec();
    res.status(200).json({ message: "Successfully deleted. " });
  } catch (err) {
    return res.status(500).json({ message: err });
  }
};

//Les followers et followings

//Exportation de la fonction follow
module.exports.follow = async (req, res) => {
  if (
    !ObjectID.isValid(req.params.id) ||
    !ObjectID.isValid(req.body.idToFollow)
  )
  return res.status(400).json({ message: "ID unknown : " + req.params.id});

try {
  let critere = { following: req.body.idToFollow };
  let critereAdd = {followers: req.params.id }
  await UserModel.findByIdAndUpdate(req.params.id, {$addToSet: critere}, { new: true, upsert: true  })
    .then(data => UserModel.findByIdAndUpdate(req.body.idToFollow,{$addToSet: critereAdd}, { new: true, upsert: true  })
      .then(data => res.send(data))
      .catch(err => res.status(500).json({ message: err }))
    ).catch(err => res.status(500).json({ message: err }));
} catch (err) {
  return res.status(400).json(err);
}
};

//Exportation de la fonction unfollow
module.exports.unfollow = async (req, res) => {
  if (
    !ObjectID.isValid(req.params.id) ||
    !ObjectID.isValid(req.body.idToUnfollow)
  )
  return res.status(400).json({ message: "ID unknown : " + req.params.id});

try {
  let critere = { following: req.body.idToUnfollow  };
  let critereAdd = {followers: req.params.id }
  await UserModel.findByIdAndUpdate(req.params.id, {$pull: critere}, { new: true, upsert: true  })
    .then(data => UserModel.findByIdAndUpdate(req.body.idToUnfollow,{$pull: critereAdd}, { new: true, upsert: true  })
      .then(data => res.send(data))
      .catch(err => res.status(500).json({ message: err }))
    ).catch(err => res.status(500).json({ message: err }));
} catch (err) {
  return res.status(400).json(err);
}
};

