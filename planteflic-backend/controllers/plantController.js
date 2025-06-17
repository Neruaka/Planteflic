// backend/controllers/plantController.js

// Import des modules
const Plant = require('../models/Plant');
const plantSchema = require('../validators/plantValidator');


exports.getPlants = async (req, res) => {
  const plants = await Plant.find({ owner: req.user });
  res.json(plants);
};

exports.createPlant = async (req, res) => {

    // Validation des champs requis
    const { error } = plantSchema.validate(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });
    
    // Vérification des champs spécifiques
    const { name, species, frequency, lastWatered } = req.body;
    if (!name) {
    return res.status(400).json({ message: 'Missing field "name"' });
  }

  if (!frequency ) {
    return res.status(400).json({ message: 'Missing field "Frequency"' });
  }
  
  if (!lastWatered) {
    return res.status(400).json({ message: 'Missing field "lastWatered"' });
  }

  const newPlant = new Plant({
    name,
    species,
    frequency,
    lastWatered,
    owner: req.user
  });

  await newPlant.save();
  res.status(201).json(newPlant);
};

exports.updatePlant = async (req, res) => {

    // Validation des champs requis
    const { error } = plantSchema.validate(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    // Vérification des champs spécifiques
  const updatedPlant = await Plant.findOneAndUpdate(
    { _id: req.params.id, owner: req.user },
    req.body,
    { new: true }
  );

  if (!updatedPlant) {
    return res.status(404).json({ message: 'Unknown Plant' });
  }

  res.json(updatedPlant);
};

exports.deletePlant = async (req, res) => {
  const deleted = await Plant.findOneAndDelete({
    _id: req.params.id,
    owner: req.user
  });

  if (!deleted) {
    return res.status(404).json({ message: 'Unknown Plant' });
  }

    res.json({ message: 'Plant Deleted' });
};
