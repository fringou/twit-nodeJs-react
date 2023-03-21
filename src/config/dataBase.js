const mongoose = require('mongoose');
mongoose.set('strictQuery',true);

mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Erreur de connexion MongoDB : '));
db.once('open', function () {
  console.log('Connexion MongoDB établie avec succès !');
});