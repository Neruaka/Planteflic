//backend/models/User.js

// Import des modules
const mongoose = require('mongoose');

// Création du schéma pour les utilisateurs
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true, // Assure que l'email est unique
        trim: true, // Enlève les espaces inutiles
    },
    password: {
        type: String,
        required: true,
        minlength: 6, // Mot de passe minimum de 6 caractères
    }
}, { timestamps: true }); // Ajoute les champs createdAt et updatedAt automatiquement 

// exporte le modèle User
module.exports = mongoose.model('User', userSchema);
