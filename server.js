// Serveur principal pour l'API de gestion de tâches
const express = require("express");
const cors = require("cors");
const taskRoutes = require("./routes/taskRoutes");
const authRoutes = require("./routes/authRoutes");

// Initialiser l'application Express
const app = express();

// Middleware pour parser le JSON
app.use(express.json());

// Middleware pour gérer les CORS (Cross-Origin Resource Sharing)
app.use(cors());

// Middleware pour logger les requêtes
app.use((req, res, next) => {
	console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
	next();
});

// Routes de base
app.get("/", (req, res) => {
	res.json({
		message: "Bienvenue sur l'API de gestion de tâches",
		endpoints: {
			tasks: "/api/tasks",
			auth: "/api/auth",
		},
	});
});

// Utiliser les routes
app.use("/api/tasks", taskRoutes);
app.use("/api/auth", authRoutes);

// Middleware pour gérer les routes non trouvées
app.use((req, res) => {
	res.status(404).json({
		success: false,
		message: "Route non trouvée",
	});
});

// Middleware pour gérer les erreurs
app.use((err, req, res, next) => {
	console.error(err.stack);
	res.status(500).json({
		success: false,
		message: "Erreur serveur",
		error: process.env.NODE_ENV === "production" ? {} : err,
	});
});

// Port d'écoute
const PORT = process.env.PORT || 3000;

// Démarrer le serveur
app.listen(PORT, () => {
	console.log(`Serveur démarré sur le port ${PORT}`);
});

module.exports = app;
