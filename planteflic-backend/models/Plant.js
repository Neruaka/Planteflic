//backend/models/Plant.js

// Import des modules
const mongoose = require('mongoose');

//schéma pour les plantes

const plantSchema = new mongoose.Schema({
  name: { type: String, required: true },
  species: { type: String },
  frequency: { type: Number, required: true }, // en jours
  lastWatered: { type: Date, required: true },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
}, { timestamps: true });

module.exports = mongoose.model('Plant', plantSchema);