//backend/routes/authRoutes.js

// Import des modules
const express = require('express');
const router = express.Router();

const {register, login} = require('../controllers/authController');

// Route pour l'enregistrement d'un nouvel utilisateur
router.post('/register', register);
// Route pour la connexion d'un utilisateur
router.post('/login', login);

// Export du routeur
module.exports = router;