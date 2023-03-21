require("dotenv").config({ path: "./src/.env"}) // Chargement des variables d'environnement depuis le fichier .env
require("./src/config/dataBase") // Importation du module qui permet de se connecter à la base de données

const express = require('express'); // Importation du module express pour créer l'application
const app = express(); // Création de l'application

app.use(express.json()); // Configuration de l'application pour utiliser le format JSON

// const cookieParser = require("cookie-parser");
// app.use(cookieParser());

// Configuration des entêtes de réponse pour permettre l'accès à l'API depuis n'importe quelle origine
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
  "Access-Control-Allow-Headers",
  "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
  "Access-Control-Allow-Methods",
  "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
  });
  
  // Configuration de l'analyseur de corps de requête pour analyser les requêtes en format JSON
  const bodyParser = require('body-parser');
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  
  // Importation et utilisation des routes de l'API
  const userRoute = require('./src/routes/user.routes');
  app.use('/api/user',userRoute);
  
  // Exportation de l'application pour permettre son utilisation dans d'autres fichiers
  module.exports = app;