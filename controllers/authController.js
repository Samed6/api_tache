// Contrôleur pour l'authentification
const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Clé secrète pour signer les tokens JWT
const JWT_SECRET = "votre_clé_secrète_jwt"; // En production, utilisez une variable d'environnement

// Méthodes du contrôleur
const authController = {
	// Enregistrer un nouvel utilisateur
	register: (req, res) => {
		try {
			// Vérifier si les données requises sont présentes
			if (!req.body.username || !req.body.password || !req.body.email) {
				return res.status(400).json({
					success: false,
					message: "Tous les champs sont requis (username, password, email)",
				});
			}

			// Créer l'utilisateur
			const newUser = User.create(req.body);

			if (!newUser) {
				return res.status(400).json({
					success: false,
					message: "Nom d'utilisateur déjà utilisé",
				});
			}

			// Générer un token JWT
			const token = jwt.sign(
				{ id: newUser.id, username: newUser.username },
				JWT_SECRET,
				{ expiresIn: "1h" }
			);

			res.status(201).json({
				success: true,
				message: "Utilisateur créé avec succès",
				data: {
					user: newUser,
					token,
				},
			});
		} catch (error) {
			res.status(500).json({
				success: false,
				message: "Erreur lors de la création de l'utilisateur",
				error: error.message,
			});
		}
	},

	// Connecter un utilisateur
	login: (req, res) => {
		try {
			// Vérifier si les données requises sont présentes
			if (!req.body.username || !req.body.password) {
				return res.status(400).json({
					success: false,
					message: "Nom d'utilisateur et mot de passe requis",
				});
			}

			// Authentifier l'utilisateur
			const user = User.authenticate(req.body.username, req.body.password);

			if (!user) {
				return res.status(401).json({
					success: false,
					message: "Nom d'utilisateur ou mot de passe incorrect",
				});
			}

			// Générer un token JWT
			const token = jwt.sign(
				{ id: user.id, username: user.username },
				JWT_SECRET,
				{ expiresIn: "1h" }
			);

			res.status(200).json({
				success: true,
				message: "Connexion réussie",
				data: {
					user,
					token,
				},
			});
		} catch (error) {
			res.status(500).json({
				success: false,
				message: "Erreur lors de la connexion",
				error: error.message,
			});
		}
	},
};

module.exports = authController;
