// Middleware d'authentification
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Clé secrète pour vérifier les tokens JWT (doit être la même que dans authController)
const JWT_SECRET = 'votre_clé_secrète_jwt'; // En production, utilisez une variable d'environnement

// Middleware pour protéger les routes
const auth = (req, res, next) => {
  try {
    // Récupérer le token du header Authorization
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        message: "Accès non autorisé. Token manquant."
      });
    }

    // Extraire le token
    const token = authHeader.split(' ')[1];

    // Vérifier le token
    const decoded = jwt.verify(token, JWT_SECRET);
    
    // Vérifier si l'utilisateur existe toujours
    const user = User.getById(decoded.id);
    
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Utilisateur non trouvé"
      });
    }

    // Ajouter les informations de l'utilisateur à la requête
    req.user = decoded;
    
    // Passer au middleware suivant
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Accès non autorisé. Token invalide.",
      error: error.message
    });
  }
};

module.exports = auth; 