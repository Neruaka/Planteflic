// backend/validators/authValidator.js

// Import des modules
const Joi = require('joi');

// Schémas de validation pour l'authentification
const registerSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required()
});

// Schéma de validation pour la connexion
const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required()
});

module.exports = {
  registerSchema,
  loginSchema
};
