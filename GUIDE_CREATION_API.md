# Guide de Création d'une API REST avec Node.js et Express

## Table des matières

1. [Introduction](#introduction)
2. [Prérequis](#prérequis)
3. [Structure du Projet](#structure-du-projet)
4. [Installation](#installation)
5. [Configuration du Serveur](#configuration-du-serveur)
6. [Organisation du Code](#organisation-du-code)
7. [Sécurité](#sécurité)
8. [Bonnes Pratiques](#bonnes-pratiques)

## Introduction

Ce guide vous explique comment créer une API REST complète avec Node.js et Express, similaire à notre projet de gestion de tâches. L'API permettra de gérer des ressources avec authentification et gestion des erreurs.

## Prérequis

- Node.js installé sur votre machine
- Un éditeur de code (VS Code recommandé)
- Connaissances de base en JavaScript
- Compréhension des concepts REST

## Structure du Projet

```
api/
├── controllers/     # Logique métier
├── models/         # Modèles de données
├── routes/         # Définition des routes
├── middlewares/    # Middlewares Express
├── server.js       # Point d'entrée
└── package.json    # Configuration du projet
```

## Installation

1. Créer un nouveau dossier et initialiser le projet :

```bash
mkdir mon-api
cd mon-api
npm init -y
```

2. Installer les dépendances nécessaires :

```bash
npm install express cors jsonwebtoken
npm install nodemon --save-dev
```

3. Configurer le package.json :

```json
{
	"name": "mon-api",
	"version": "1.0.0",
	"main": "server.js",
	"scripts": {
		"start": "node server.js",
		"dev": "nodemon server.js"
	},
	"dependencies": {
		"cors": "^2.8.5",
		"express": "^4.21.2",
		"jsonwebtoken": "^9.0.2"
	}
}
```

## Configuration du Serveur

1. Créer le fichier server.js :

```javascript
const express = require("express");
const cors = require("cors");

const app = express();

// Middlewares
app.use(express.json());
app.use(cors());

// Routes
app.get("/", (req, res) => {
	res.json({ message: "Bienvenue sur l'API" });
});

// Gestion des erreurs
app.use((err, req, res, next) => {
	console.error(err.stack);
	res.status(500).json({
		success: false,
		message: "Erreur serveur",
	});
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
	console.log(`Serveur démarré sur le port ${PORT}`);
});
```

## Organisation du Code

### 1. Routes (routes/)

```javascript
const express = require("express");
const router = express.Router();
const controller = require("../controllers/controller");

router.get("/", controller.getAll);
router.post("/", controller.create);
router.get("/:id", controller.getById);

module.exports = router;
```

### 2. Controllers (controllers/)

```javascript
const getAll = async (req, res) => {
	try {
		// Logique métier
		res.json({ success: true, data: [] });
	} catch (error) {
		res.status(500).json({ success: false, error: error.message });
	}
};

module.exports = {
	getAll,
	// autres méthodes
};
```

### 3. Middlewares (middlewares/)

```javascript
const auth = (req, res, next) => {
	try {
		const token = req.headers.authorization?.split(" ")[1];
		if (!token) {
			return res.status(401).json({ message: "Non authentifié" });
		}
		// Vérification du token
		next();
	} catch (error) {
		res.status(401).json({ message: "Token invalide" });
	}
};

module.exports = auth;
```

## Sécurité

1. Utiliser des variables d'environnement pour les secrets
2. Implémenter l'authentification JWT
3. Valider les données entrantes
4. Utiliser HTTPS en production
5. Limiter les requêtes (rate limiting)

## Bonnes Pratiques

1. **Nommage**

   - Utiliser des noms descriptifs
   - Suivre une convention de nommage cohérente
   - Utiliser des verbes pour les routes

2. **Structure des Réponses**

```javascript
{
  success: true/false,
  data: {}, // données si succès
  error: {} // détails de l'erreur si échec
}
```

3. **Gestion des Erreurs**

   - Utiliser try/catch
   - Centraliser la gestion des erreurs
   - Logger les erreurs

4. **Documentation**
   - Documenter les endpoints
   - Maintenir un README à jour
   - Utiliser des commentaires pertinents

## Démarrage du Projet

1. Cloner le projet
2. Installer les dépendances : `npm install`
3. Lancer en développement : `npm run dev`
4. Lancer en production : `npm start`

## Tests

Pour tester l'API, vous pouvez utiliser :

- Postman
- cURL
- Insomnia
- Thunder Client (extension VS Code)

## Conclusion

Cette structure permet de créer une API REST robuste et maintenable. N'oubliez pas de :

- Suivre les principes REST
- Maintenir une bonne documentation
- Tester régulièrement
- Sécuriser vos endpoints
- Gérer les erreurs proprement
