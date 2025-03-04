# Documentation de l'API de Gestion de Tâches

Cette documentation explique en détail le fonctionnement de l'API de gestion de tâches développée avec Node.js et Express.

## Structure du Projet

```
api/
├── controllers/        # Logique métier
│   ├── authController.js
│   └── taskController.js
├── middlewares/        # Middlewares personnalisés
│   └── auth.js
├── models/             # Modèles de données
│   ├── Task.js
│   └── User.js
├── routes/             # Définition des routes
│   ├── authRoutes.js
│   └── taskRoutes.js
├── server.js           # Point d'entrée de l'application
├── package.json        # Configuration du projet
└── README.md           # Instructions d'installation
```

## Explication des Composants

### Modèles (Models)

Les modèles définissent la structure des données et les méthodes pour les manipuler.

#### Task.js

Ce modèle gère les tâches avec les méthodes suivantes :

- `getAll()` : Récupère toutes les tâches
- `getById(id)` : Récupère une tâche par son ID
- `create(taskData)` : Crée une nouvelle tâche
- `update(id, taskData)` : Met à jour une tâche existante
- `delete(id)` : Supprime une tâche

Comme nous n'utilisons pas de base de données, les tâches sont stockées en mémoire dans un tableau.

#### User.js

Ce modèle gère les utilisateurs avec les méthodes suivantes :

- `getAll()` : Récupère tous les utilisateurs (sans les mots de passe)
- `getById(id)` : Récupère un utilisateur par son ID
- `getByUsername(username)` : Récupère un utilisateur par son nom d'utilisateur
- `create(userData)` : Crée un nouvel utilisateur
- `authenticate(username, password)` : Authentifie un utilisateur

### Contrôleurs (Controllers)

Les contrôleurs contiennent la logique métier et gèrent les requêtes HTTP.

#### taskController.js

Ce contrôleur gère les opérations CRUD sur les tâches :

- `getAllTasks(req, res)` : Récupère toutes les tâches
- `getTaskById(req, res)` : Récupère une tâche par son ID
- `createTask(req, res)` : Crée une nouvelle tâche
- `updateTask(req, res)` : Met à jour une tâche existante
- `deleteTask(req, res)` : Supprime une tâche

#### authController.js

Ce contrôleur gère l'authentification des utilisateurs :

- `register(req, res)` : Enregistre un nouvel utilisateur
- `login(req, res)` : Connecte un utilisateur et génère un token JWT

### Middlewares

Les middlewares sont des fonctions qui s'exécutent entre la requête et la réponse.

#### auth.js

Ce middleware vérifie l'authentification des utilisateurs en validant le token JWT fourni dans l'en-tête `Authorization`.

### Routes

Les routes définissent les endpoints de l'API et les associent aux contrôleurs.

#### taskRoutes.js

- `GET /api/tasks` : Récupère toutes les tâches
- `GET /api/tasks/:id` : Récupère une tâche spécifique
- `POST /api/tasks` : Crée une nouvelle tâche (protégé)
- `PUT /api/tasks/:id` : Met à jour une tâche (protégé)
- `DELETE /api/tasks/:id` : Supprime une tâche (protégé)

#### authRoutes.js

- `POST /api/auth/register` : Enregistre un nouvel utilisateur
- `POST /api/auth/login` : Connecte un utilisateur

### Serveur (server.js)

Le fichier `server.js` est le point d'entrée de l'application. Il configure Express, les middlewares et les routes.

## Authentification avec JWT

L'API utilise JSON Web Tokens (JWT) pour l'authentification :

1. L'utilisateur s'enregistre ou se connecte via les endpoints d'authentification
2. Le serveur génère un token JWT contenant l'ID et le nom d'utilisateur
3. Le client inclut ce token dans l'en-tête `Authorization` pour les requêtes protégées
4. Le middleware `auth.js` vérifie la validité du token

## Exemples d'Utilisation

### Enregistrement d'un utilisateur

```http
POST /api/auth/register
Content-Type: application/json

{
  "username": "utilisateur1",
  "password": "motdepasse123",
  "email": "utilisateur1@example.com"
}
```

### Connexion

```http
POST /api/auth/login
Content-Type: application/json

{
  "username": "utilisateur1",
  "password": "motdepasse123"
}
```

### Création d'une tâche (avec authentification)

```http
POST /api/tasks
Content-Type: application/json
Authorization: Bearer <votre_token_jwt>

{
  "title": "Nouvelle tâche",
  "description": "Description de la tâche",
  "status": "à faire"
}
```

### Récupération de toutes les tâches

```http
GET /api/tasks
```

## Sécurité

Points importants concernant la sécurité :

1. En production, les mots de passe devraient être hachés (avec bcrypt par exemple)
2. La clé secrète JWT devrait être stockée dans une variable d'environnement
3. Les tokens JWT ont une durée de validité limitée (1 heure dans notre implémentation)

## Améliorations Possibles

1. Ajouter une base de données (MongoDB, PostgreSQL, etc.)
2. Implémenter la validation des données avec Joi ou express-validator
3. Ajouter des tests unitaires et d'intégration
4. Mettre en place une documentation interactive avec Swagger/OpenAPI
5. Implémenter la pagination pour les listes de tâches
