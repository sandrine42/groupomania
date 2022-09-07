//Importation de MONGOOSE
const mongoose = require('mongoose');

//Création d'un schéma de données pour la base de données MongoDB
//qui contient les champs souhaités pour le model post
//indique leur type ainsi que leur caractère (obligatoire ou non)
//utilise la méthode Schema mise à disposition par Mongoose
const PostSchema = new mongoose.Schema(
  {
    posterId: {
      type: String,
      required: true
    },
    message: {
      type: String,
      trim: true,
      maxlength: 500,
    },
    picture: {
      type: String,
    },
    video: {
      type: String,
    },
    likers: {
      type: [String],
      required: true,
    },
    comments: {
      type: [
        {
          commenterId:String,
          commenterPseudo: String,
          text: String,
          timestamp: Number,
        }
      ],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

//Exportation de ce schéma en tant que modèle Mongoose appelé « post »,
//le rendant par là même disponible pour notre application Express
//à l'aide de la méthode model qui le transforme en un modèle utilisable.
module.exports = mongoose.model('post', PostSchema);