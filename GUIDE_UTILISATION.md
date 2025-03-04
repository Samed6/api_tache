# Guide d'Utilisation de l'API de Gestion de Tâches

## 1. Présentation du Projet

Ce projet est une API RESTful pour la gestion de tâches, développée avec Node.js et Express. Elle permet de :

- Gérer des utilisateurs (inscription, connexion)
- Créer, lire, mettre à jour et supprimer des tâches
- Sécuriser les routes avec JWT (JSON Web Tokens)

## 2. Structure du Code

### 2.1 Modèles (Models)

#### Task.js

```javascript
// Stockage des tâches en mémoire
let tasks = [
  {
    id: 1,
    title: "Apprendre Node.js",
    description: "Étudier les concepts de base",
    status: "en cours",
    createdAt: "2024-03-04T..."
  }
];

// Méthodes disponibles :
- getAll() : Liste toutes les tâches
- getById(id) : Récupère une tâche spécifique
- create(taskData) : Crée une nouvelle tâche
- update(id, taskData) : Met à jour une tâche
- delete(id) : Supprime une tâche
```

#### User.js

```javascript
// Stockage des utilisateurs en mémoire
let users = [
  {
    id: 1,
    username: "admin",
    password: "admin123",
    email: "admin@example.com"
  }
];

// Méthodes disponibles :
- getAll() : Liste tous les utilisateurs
- getById(id) : Récupère un utilisateur
- create(userData) : Crée un nouvel utilisateur
- authenticate(username, password) : Vérifie les identifiants
```

### 2.2 Contrôleurs (Controllers)

#### taskController.js

```javascript
// Gestion des requêtes liées aux tâches
- getAllTasks : GET /api/tasks
- getTaskById : GET /api/tasks/:id
- createTask : POST /api/tasks
- updateTask : PUT /api/tasks/:id
- deleteTask : DELETE /api/tasks/:id
```

#### authController.js

```javascript
// Gestion de l'authentification
- register : POST /api/auth/register
- login : POST /api/auth/login
```

### 2.3 Middlewares

#### auth.js

```javascript
// Vérification du token JWT
- Vérifie la présence du token
- Valide le token
- Ajoute les informations utilisateur à la requête
```

## 3. Test avec Postman

### 3.1 Configuration Initiale

1. **Installation de Postman**

   - Télécharger depuis https://www.postman.com/downloads/
   - Installer l'application
   - Créer un compte (optionnel)

2. **Création d'une Collection**
   - Cliquer sur "Collections" dans le menu de gauche
   - Cliquer sur "+" pour créer une nouvelle collection
   - Nommer la collection "API Gestion de Tâches"

### 3.2 Test des Endpoints

#### 3.2.1 Route Principale

```
GET http://localhost:3000
```

Réponse attendue :

```json
{
	"message": "Bienvenue sur l'API de gestion de tâches",
	"endpoints": {
		"tasks": "/api/tasks",
		"auth": "/api/auth"
	}
}
```

#### 3.2.2 Création d'un Utilisateur

```
POST http://localhost:3000/api/auth/register
Headers:
  Content-Type: application/json
Body:
{
    "username": "test",
    "password": "test123",
    "email": "test@example.com"
}
```

Réponse attendue :

```json
{
	"success": true,
	"message": "Utilisateur créé avec succès",
	"data": {
		"user": {
			"id": 2,
			"username": "test",
			"email": "test@example.com"
		},
		"token": "eyJhbGciOiJIUzI1NiIs..."
	}
}
```

#### 3.2.3 Connexion

```
POST http://localhost:3000/api/auth/login
Headers:
  Content-Type: application/json
Body:
{
    "username": "test",
    "password": "test123"
}
```

Réponse attendue :

```json
{
	"success": true,
	"message": "Connexion réussie",
	"data": {
		"user": {
			"id": 2,
			"username": "test",
			"email": "test@example.com"
		},
		"token": "eyJhbGciOiJIUzI1NiIs..."
	}
}
```

#### 3.2.4 Création d'une Tâche

```
POST http://localhost:3000/api/tasks
Headers:
  Content-Type: application/json
  Authorization: Bearer <votre_token_jwt>
Body:
{
    "title": "Nouvelle tâche",
    "description": "Description de la tâche",
    "status": "à faire"
}
```

#### 3.2.5 Liste des Tâches

```
GET http://localhost:3000/api/tasks
```

#### 3.2.6 Mise à Jour d'une Tâche

```
PUT http://localhost:3000/api/tasks/1
Headers:
  Content-Type: application/json
  Authorization: Bearer <votre_token_jwt>
Body:
{
    "title": "Tâche mise à jour",
    "status": "en cours"
}
```

#### 3.2.7 Suppression d'une Tâche

```
DELETE http://localhost:3000/api/tasks/1
Headers:
  Authorization: Bearer <votre_token_jwt>
```

### 3.3 Bonnes Pratiques pour les Tests

1. **Gestion du Token JWT**

   - Copier le token reçu lors de la connexion
   - L'utiliser dans l'en-tête Authorization pour les requêtes protégées

2. **Variables d'Environnement**

   - Créer un environnement "Local" dans Postman
   - Ajouter une variable `base_url` avec la valeur `http://localhost:3000`
   - Ajouter une variable `token` pour stocker le JWT

3. **Tests Automatiques**
   - Utiliser l'onglet "Tests" dans Postman pour vérifier les réponses
   - Exemple de test :
   ```javascript
   pm.test("Status code is 200", function () {
   	pm.response.to.have.status(200);
   });
   ```

## 4. Points Importants à Retenir

1. **Sécurité**

   - Les mots de passe sont stockés en clair (à améliorer en production)
   - Les tokens JWT expirent après 1 heure
   - Les routes de modification nécessitent une authentification

2. **Structure**

   - Architecture MVC (Model-View-Controller)
   - Stockage en mémoire (pas de base de données)
   - Middleware d'authentification pour les routes protégées

3. **Améliorations Possibles**
   - Ajouter une base de données
   - Implémenter la validation des données
   - Ajouter des tests unitaires
   - Mettre en place une documentation Swagger

## 5. Démarrer le Projet

1. **Installation**

   ```bash
   npm install
   ```

2. **Démarrage du Serveur**

   ```bash
   npm start
   ```

3. **Test de l'API**
   - Ouvrir Postman
   - Importer la collection
   - Tester les endpoints dans l'ordre :
     1. Route principale
     2. Création d'utilisateur
     3. Connexion
     4. Opérations sur les tâches
