const jwt = require('jsonwebtoken');
const UserModel = require('../models/user.model');

// Middleware pour vérifier si l'utilisateur est présent dans la base de données
const checkUser = (req, res, next) => {
    // Récupération du jeton d'authentification stocké dans le cookie 'jwt'
    const token = req.cookies.jwt;

    if (token) {
        // Vérification et décodage du jeton d'authentification
        jwt.verify(token, process.env.TOKEN_SECRET, async (err, decodedToken) => {
            if (err) {
                // Si une erreur se produit lors de la vérification du jeton, l'utilisateur n'est pas authentifié
                console.log(err.message);
                // Appel de la fonction 'next' pour passer au middleware suivant
                next();
            } else {
                try {
                    // Si le jeton est valide, récupération de l'utilisateur associé
                    let user = await UserModel.findById(decodedToken.id);
                    // Vérification si l'utilisateur est présent dans la base de données
                    if (!user) {
                        throw Error('Utilisateur non trouvé');
                    }
                    // Stockage de l'utilisateur dans l'objet 'locals' pour la rendre disponible aux vues
                    res.locals.user = user;
                    // Appel de la fonction 'next' pour passer au middleware suivant
                    next();
                } catch (err) {
                    res.locals.user = null;
                    // Suppression du cookie 'jwt'
                    res.cookies('jwt', '', { maxAge: 1 });
                    next();
                }
            }
        });
    } else {
        // Si le cookie 'jwt' n'est pas présent, l'utilisateur n'est pas authentifié
        res.locals.user = null;
        // Redirection vers la page de connexion
        res.redirect('/login');
        // Appel de la fonction 'next' pour passer au middleware suivant
        next();
    }
}
// Middleware pour vérifier l'authentification de l'utilisateur
const requireAuth = (req, res, next) => {
    // Récupération du jeton d'authentification stocké dans le cookie 'jwt'
    const token = req.cookies.jwt;

    if (token) {
        // Vérification et décodage du jeton d'authentification
        jwt.verify(token, process.env.TOKEN_SECRET, async (err, decodedToken) => {
            if (err) {
                // Si une erreur se produit lors de la vérification du jeton, l'utilisateur n'est pas authentifié
                console.log(err.message);
                // Stockage de la propriété 'user' à null dans l'objet 'locals' pour la rendre disponible aux vues
                res.locals.user = null;
                // Suppression du cookie 'jwt'
                res.cookie('jwt', '', { maxAge: 1 });
                // Redirection vers la page de connexion
                res.redirect('/login');
            } else {
                try {
                    // Si le jeton est valide, récupération de l'utilisateur associé
                    let user = await UserModel.findById(decodedToken.id);
                    if (!user) {
                        throw Error('Utilisateur non trouvé');
                    }
                    // Stockage de l'utilisateur dans l'objet 'locals' pour la rendre disponible aux vues
                    res.locals.user = user;
                    // Appel de la fonction 'next' pour passer au middleware suivant
                    next();
                }
                catch (err) {
                    res.locals.user = null;
                    // Suppression du cookie 'jwt'
                    res.cookie('jwt', '', { maxAge: 1 });
                    // Redirection vers la page de connexion
                    res.redirect('/login');
                }
            }
        });
    } else {
        // Si le cookie 'jwt' n'est pas présent, l'utilisateur n'est pas authentifié
        res.locals.user = null;
        // Appel de la fonction 'next' pour passer au middleware suivant
        // next();
    }
};

module.exports = { requireAuth, checkUser };
