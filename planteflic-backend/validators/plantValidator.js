// backend/validators/plantValidator.js

// Import des modules
const Joi = require('joi');

// Schéma de validation pour les plantes
const plantSchema = Joi.object({
  name: Joi.string().min(2).required(), // Nom de la plante, minimum 2 caractères
  species: Joi.string().allow('', null), // Espèce de la plante, peut être vide ou null
  frequency: Joi.number().min(1).required(), // Fréquence d'arrosage en jours, minimum 1 jour
  lastWatered: Joi.date().required() // Date du dernier arrosage, requise
});

module.exports = plantSchema;
