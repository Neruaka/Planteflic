// backend/controllers/plantController.js

// Import des modules
const Plant = require('../models/Plant');
const plantSchema = require('../validators/plantValidator');


exports.getPlants = async (req, res) => {
  try {
    const plants = await Plant.find({ owner: req.user });
    
    // Ajouter des informations sur l'état d'arrosage
    const plantsWithStatus = plants.map(plant => {
      const plantObj = plant.toObject();
      plantObj.needsWatering = plant.needsWatering();
      plantObj.daysSinceWatering = plant.daysSinceWatering();
      return plantObj;
    });
    
    res.json(plantsWithStatus);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error: error.message });
  }
};

exports.getPlant = async (req, res) => {
  try {
    // Recherche d'une plante par ID ET propriétaire (sécurité)
    const plant = await Plant.findOne({ _id: req.params.id, owner: req.user });

    if (!plant) {
      return res.status(404).json({ message: 'Plante non trouvée' });
    }
    
    const plantObj = plant.toObject();
    plantObj.needsWatering = plant.needsWatering();
    plantObj.daysSinceWatering = plant.daysSinceWatering();
    
    res.json(plantObj);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error: error.message });
  }
};

exports.createPlant = async (req, res) => {
  try {
    // Validation des champs requis
    const { error } = plantSchema.validate(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });
    
    const { name, species, location, wateringFrequency, image, lastWatered } = req.body;
    
    const newPlant = new Plant({
      name,
      species: species || '',
      location: location || '',
      wateringFrequency: wateringFrequency || 7,
      image: image || '',
      lastWatered: lastWatered || new Date(),
      owner: req.user
    });

    await newPlant.save();
    
    const plantObj = newPlant.toObject();
    plantObj.needsWatering = newPlant.needsWatering();
    plantObj.daysSinceWatering = newPlant.daysSinceWatering();
    
    res.status(201).json(plantObj);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error: error.message });
  }
};

exports.updatePlant = async (req, res) => {
  try {
    // Validation des champs requis
    const { error } = plantSchema.validate(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    const updatedPlant = await Plant.findOneAndUpdate(
      { _id: req.params.id, owner: req.user },
      req.body,
      { new: true }
    );

    if (!updatedPlant) {
      return res.status(404).json({ message: 'Plante non trouvée' });
    }

    const plantObj = updatedPlant.toObject();
    plantObj.needsWatering = updatedPlant.needsWatering();
    plantObj.daysSinceWatering = updatedPlant.daysSinceWatering();

    res.json(plantObj);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error: error.message });
  }
};

exports.deletePlant = async (req, res) => {
  try {
    const deleted = await Plant.findOneAndDelete({
      _id: req.params.id,
      owner: req.user
    });

    if (!deleted) {
      return res.status(404).json({ message: 'Plante non trouvée' });
    }

    res.json({ message: 'Plante supprimée avec succès' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error: error.message });
  }
};

// Nouvelle route pour marquer une plante comme arrosée
exports.waterPlant = async (req, res) => {
  try {
    const plant = await Plant.findOneAndUpdate(
      { _id: req.params.id, owner: req.user },
      { lastWatered: new Date() },
      { new: true }
    );

    if (!plant) {
      return res.status(404).json({ message: 'Plante non trouvée' });
    }

    const plantObj = plant.toObject();
    plantObj.needsWatering = plant.needsWatering();
    plantObj.daysSinceWatering = plant.daysSinceWatering();

    res.json(plantObj);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error: error.message });
  }
};
