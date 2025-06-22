//backend/models/Plant.js

// Import des modules
const mongoose = require('mongoose');

//schéma pour les plantes
const plantSchema = new mongoose.Schema({
  name: { type: String, required: true },
  species: { type: String, required: true },
  location: String,
  wateringFrequency: { type: Number, default: 7 }, // jours entre arrosages
  image: { type: String, default: '' }, // chemin vers l'image ou URL
  lastWatered: { type: Date, default: Date.now },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
}, { timestamps: true });

//vérifier si arrosage nécessaire
plantSchema.methods.needsWatering = function() {
  const daysSinceWatering = Math.floor((Date.now() - this.lastWatered) / (1000 * 60 * 60 * 24));
  return daysSinceWatering >= this.wateringFrequency;
};

// Calculer les jours depuis le dernier arrosage
plantSchema.methods.daysSinceWatering = function() {
  return Math.floor((Date.now() - this.lastWatered) / (1000 * 60 * 60 * 24));
};

module.exports = mongoose.model('Plant', plantSchema);