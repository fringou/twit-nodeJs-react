const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');
const userController = require('../controllers/user.controller');

// Routes pour la gestion des utilisateurs

// Route pour la création d'un nouvel utilisateur
router.post('/register', authController.signUp);

// Route pour la connexion d'un utilisateur
router.post('/login', authController.signIn);

// Route pour la déconnexion d'un utilisateur
router.post('/logout', authController.logout);

// Route pour récupérer les informations d'un utilisateur
router.get('/:id', userController.getUserById);

// Route pour la modification des informations d'un utilisateur
router.put('/:id', userController.updateUser);

// Route pour la suppression d'un utilisateur
router.delete('/:id', userController.deleteUser);

// Route pour suivre un utilisateur
router.post('/:userId/follow', userController.follow);

// Route pour ne plus suivre un utilisateur
router.post('/:userId/unfollow', userController.unfollow);

// Route pour liker un texte
router.post('/:userId/like', userController.like);

// Route pour unliker un texte
router.post('/:userId/unlike', userController.unlike);

module.exports = router;
