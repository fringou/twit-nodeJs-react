const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const {isEmail} = require('validator');
const bcrypt = require('bcrypt');

const userSchema = new Schema({
  pseudo: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: 25,
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
    // select:false
  },
  password: {
    type: String,
    required: true,
    minLength: 12,
    maxLength: 1024,
    select: false
  }, 
  pictures: {
    type: String,
    default: "/uploads/profil/random-user.png"
  },
  bio:{
    type: String,
    maxLength: 1024
  },
  followers: {
    type: [String]
  },
  following: {
    type: [String]
  },
  likes:{
    type: [String]
  }
},
{
    timestamps: true
  },
);

// cryptage du password
userSchema.pre('save', async function(next) {
  const user = this;
  if (!user.isModified('password')) {
    return next();
  }
  const salt = await bcrypt.genSalt();
  const hash = await bcrypt.hash(user.password, salt);
  user.password = hash;
  next();
});
userSchema.statics.login = async function(email, password){
  const user = await this.findOne({email});
  if(user){ 
    const auth =  await bcrypt.compare(password, user.password);// Inverser les arguments de bcrypt.compare()
    if (auth){
      return user; // Retourner l'utilisateur au lieu de la valeur booléenne
    }
    throw Error('mot de passe incorrect'); // Retourner une erreur explicite si les mots de passe ne correspondent pas
  }
  throw Error('email incorrect'); // Retourner une erreur explicite si l'email est introuvable dans la base de données
}
const UserModel = mongoose.model('user', userSchema);

module.exports = UserModel;

