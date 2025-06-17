//backend/server.js

//import des modules 
const express = require('express');
const connectDB = require('./config/db');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');
const authMiddleware = require('./middleware/authMiddleware');
const plantRoutes = require('./routes/plantRoutes');

//charge les variables d'environnement
require('dotenv').config();

const app = express();
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/plants', authMiddleware, plantRoutes);


// Connexion à la base de données
connectDB();
// Middleware d'authentification
app.get('/api/protected', authMiddleware, (req, res) => {
    res.status(200).json({ message: 'Accès autorisé', userId: req.user});
});
// Route de base
app.get('/', (req, res) => {
    res.send('Bienvenue sur l\'API de Planteflic !');
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log('serveur lancé sur le port ' + port));