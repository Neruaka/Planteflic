// backend/routes/plantRoutes.js

// Import des modules
const express = require('express');
const router = express.Router();
// Import des contrôleurs pour les plantes
const {
  getPlants,
  getPlant,
  createPlant,
  updatePlant,
  deletePlant
} = require('../controllers/plantController');


router.get('/', getPlants);              // Lire toutes les plantes de l'utilisateur
router.get('/:id', getPlant);            // Lire une plante spécifique
router.post('/', createPlant);           // Créer une plante
router.put('/:id', updatePlant);         // Modifier une plante
router.delete('/:id', deletePlant);      // Supprimer une plante

module.exports = router;
