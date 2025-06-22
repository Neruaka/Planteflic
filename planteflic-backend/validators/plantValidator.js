// backend/validators/plantValidator.js

// Import des modules
const Joi = require('joi');

// Schéma de validation pour les plantes
const plantSchema = Joi.object({
  name: Joi.string().min(2).required(), // Nom de la plante, minimum 2 caractères
  species: Joi.string().allow('', null), // Espèce de la plante, peut être vide ou null
  location: Joi.string().allow('', null), // Emplacement de la plante, peut être vide ou null
  wateringFrequency: Joi.number().min(1).max(365).default(7), // Fréquence d'arrosage en jours, valeur par défaut 7 jours
  image: Joi.string().allow('', null), // URL ou chemin de l'image, peut être vide ou null
  lastWatered: Joi.date().required() // Date du dernier arrosage, requise
});

module.exports = plantSchema;
