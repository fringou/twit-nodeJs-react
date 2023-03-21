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
    // select: false
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

// Hashage du mot de passe avant de sauvegarder l'utilisateur
userSchema.pre('save', async function (next) {
  const user = this;
  if (user.isModified('password')) {
    const salt = await bcrypt.genSalt();
    user.password = await bcrypt.hash(user.password, salt);
  }
  next();
});

const UserModel = mongoose.model('User', userSchema);

module.exports = UserModel;
