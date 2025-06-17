//backend/middleware/authMiddleware.js

const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {

    //reccuperer le token 
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Unauthorized access' });
    }

    //extraire le token
    const token = authHeader.split(' ')[1];

    try {
        //verifier le token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded.id ; // Stocker l'ID de l'utilisateur dans la requête
        next(); // Passer au middleware suivant ou à la route
    }
    catch (error) {
        return res.status(401).json({ message: 'Invalid token' });
    }
};