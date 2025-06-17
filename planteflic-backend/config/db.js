//backend/config/db.js

// Import des modules
const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        // Connexion à la base de données MongoDB
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB connecté avec succès');
    } catch (error) {
        console.error('Erreur de connexion à MongoDB:', error.message);
        process.exit(1); // Arrêt du processus en cas d'erreur
    }
}
// Export de la fonction de connexion
module.exports = connectDB;