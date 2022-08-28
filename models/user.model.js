//Importation de MONGOOSE
const mongoose = require('mongoose');
//Importation de validator pour la valider l'email
const { isEmail } = require('validator');
//Importation de BCRYPT pour hasher le mot de passe des utilisateurs
//bcrypt est une fonction adaptative de hachage basée sur un algorithme de chiffrement,
//utilisant le salage (méthode permettant de renforcer la sécurité des informations
//qui sont destinées à être hachées) en y ajoutant une donnée supplémentaire
//afin d’empêcher que deux informations identiques ne conduisent à la même empreinte
//Protège des attaques par table arc-en-ciel (rainbow table, possibilité de voler efficacement
//les mots de passe des systèmes) et par force brute (méthode utilisée pour trouver un mot de passe ou une clé.
//Il s'agit de tester, une à une, toutes les combinaisons possibles)
const bcrypt = require('bcrypt');

//Création d'un schéma de données pour la base de données MongoDB
//qui contient les champs souhaités pour le model user
//indique leur type ainsi que leur caractère (obligatoire ou non)
//utilise la méthode Schema mise à disposition par Mongoose
const userSchema = new mongoose.Schema(
  {
    pseudo: {
      type: String,
      required: true,
      minLength: 3,
      maxLength: 55,
      unique: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      validate: [isEmail],
      lowercase: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      max: 1024,
      minlength: 6
    },
    picture: {
      type: String,
      default: "./uploads/profil/random-user.png"
    },
    bio :{
      type: String,
      max: 1024,
    },
    followers: {
      type: [String]
    },
    following: {
      type: [String]
    },
    likes: {
      type: [String]
    },
    isAdmin: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true,
  }
);

// Pré-enregistrement pour chiffrer le mot de passe 
userSchema.pre("save", async function(next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});
//Permet de créer une fonction directement liée au schéma,
//mais appelée à partir du même fichier à l'aide du modèle,
//pour vérifier si les données existant déjà

userSchema.statics.login = async function(email, password) {
  const user = await this.findOne({ email });
  if (user) {
    const auth = await bcrypt.compare(password, user.password);
    if (auth) {
      return user;
    }
    throw Error('incorrect password');
  }
  throw Error('incorrect email')
};

//Exportation de ce schéma en tant que modèle Mongoose appelé « User »,
//le rendant par là même disponible pour notre application Express
//à l'aide de la méthode model qui le transforme en un modèle utilisable.

const UserModel = mongoose.model("user", userSchema);
module.exports = UserModel;