# API de Gestion de Tâches

Ce projet est une API RESTful simple pour la gestion de tâches, développée avec Node.js et Express.

## Fonctionnalités

- Création de tâches
- Consultation de la liste des tâches
- Consultation d'une tâche spécifique
- Mise à jour d'une tâche
- Suppression d'une tâche
- Authentification avec JWT

## Installation

1. Clonez ce dépôt
2. Installez les dépendances avec `npm install`
3. Lancez le serveur avec `npm start`

## Endpoints

- `GET /api/tasks` - Récupérer toutes les tâches
- `GET /api/tasks/:id` - Récupérer une tâche spécifique
- `POST /api/tasks` - Créer une nouvelle tâche
- `PUT /api/tasks/:id` - Mettre à jour une tâche
- `DELETE /api/tasks/:id` - Supprimer une tâche
- `POST /api/auth/register` - Créer un nouvel utilisateur
- `POST /api/auth/login` - Se connecter et obtenir un token JWT

## Structure du Projet

- `server.js` - Point d'entrée de l'application
- `routes/` - Définition des routes de l'API
- `controllers/` - Logique métier
- `middlewares/` - Middlewares personnalisés (authentification, etc.)
- `models/` - Modèles de données

## Technologies Utilisées

- Node.js
- Express.js
- JSON Web Tokens (JWT)
