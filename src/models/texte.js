const mongoose = require('mongoose');

const PosttexteSchema = new mongoose.Schema({
  titre: {type: String, required: true, unique: true, maxLength: 100},
  message: { type: String, required: true, maxLength: 500 },
  author: { type: String, required: true, maxLength:100},
},
{timestamps: true}// permet de generer une date automatiquement grace a mongoose
);

module.exports = mongoose.model('Texte', PosttexteSchema);
