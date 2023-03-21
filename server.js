const http = require("http"); // Importation du module http pour créer un serveur HTTP
const app = require("./app"); // Importation du module app qui contient la configuration de l'application

// Fonction pour normaliser le port du serveur
const normalizePort = (val) => {
  const port = parseInt(val, 10);
  if (isNaN(port)) {
    return val; // Si le port n'est pas un nombre, retourner la valeur de port
  }
  if (port >= 0) {
    return port; // Si le port est supérieur ou égal à 0, retourner la valeur de port
  }
  return false; // Si le port ne correspond à aucune de ces conditions, retourner false
};

// Normalisation du port en utilisant la valeur de l'environnement si elle existe, sinon le port 3000 sera utilisé
const port = normalizePort(process.env.PORT || "3000"); 

// Configuration de l'application pour utiliser le port spécifié
app.set("port", port); 

// Fonction de gestion d'erreur pour le serveur
const errorHandler = (error) => {
  if (error.syscall !== "listen") {
    throw error; // Si l'erreur ne correspond pas à une erreur de 'listen', l'erreur est lancée
  }

  // Récupération de l'adresse du serveur
  const address = server.address();
  
  const bind =
    typeof address === "string" ? "pipe " + address : "port: " + port;// Récupération de la valeur à laquelle le serveur est lié
  // Gestion des différents types d'erreurs de 'listen'
  switch (error.code) {
    // Si l'erreur est causée par un manque de privilèges, afficher un message d'erreur et quitter le processus
    case "EACCES":
      console.error(bind + " requires elevated privileges.");
      process.exit(1);
      break;
    // Si l'erreur est causée par le port déjà utilisé, afficher un message d'erreur et quitter le processus
    case "EADDRINUSE":
      console.error(bind + " is already in use.");
      process.exit(1);
      break;
    // Si l'erreur ne correspond à aucune de ces conditions, l'erreur est lancée
    default:
      throw error;
  }
};

// Création du serveur en utilisant la configuration de l'application
const server = http.createServer(app);
server.on("error", errorHandler);// Gestion des erreurs du serveur

// Lancement du serveur
server.on("listening", () => {
  const address = server.address();// Récupération de l'adresse du serveur
  const bind = typeof address === "string" ? "pipe " + address : "port " + port;// Récupération de la valeur à laquelle le serveur est lié
  console.log("Listening on " + bind);// Affichage d'un message de confirmation lorsque le serveur est lancé avec succès
});

server.listen(port);// Écoute du port spécifié
