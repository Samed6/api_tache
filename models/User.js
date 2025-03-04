// Modèle de données pour les utilisateurs
// Comme nous n'utilisons pas de base de données, nous allons stocker les utilisateurs en mémoire

// Tableau pour stocker les utilisateurs
let users = [
	{
		id: 1,
		username: "admin",
		password: "admin123", // En production, il faudrait hacher les mots de passe
		email: "admin@example.com",
		createdAt: new Date().toISOString(),
	},
];

// Compteur pour générer des IDs uniques
let nextId = 2;

// Méthodes pour manipuler les utilisateurs
const User = {
	// Récupérer tous les utilisateurs
	getAll: () => {
		return users.map((user) => {
			const { password, ...userWithoutPassword } = user;
			return userWithoutPassword;
		});
	},

	// Récupérer un utilisateur par son ID
	getById: (id) => {
		const user = users.find((user) => user.id === parseInt(id));
		if (!user) return null;

		const { password, ...userWithoutPassword } = user;
		return userWithoutPassword;
	},

	// Récupérer un utilisateur par son nom d'utilisateur
	getByUsername: (username) => {
		return users.find((user) => user.username === username);
	},

	// Créer un nouvel utilisateur
	create: (userData) => {
		// Vérifier si l'utilisateur existe déjà
		if (users.some((user) => user.username === userData.username)) {
			return null;
		}

		const newUser = {
			id: nextId++,
			username: userData.username,
			password: userData.password, // En production, il faudrait hacher les mots de passe
			email: userData.email,
			createdAt: new Date().toISOString(),
		};

		users.push(newUser);

		const { password, ...userWithoutPassword } = newUser;
		return userWithoutPassword;
	},

	// Authentifier un utilisateur
	authenticate: (username, password) => {
		const user = users.find(
			(user) => user.username === username && user.password === password
		);
		if (!user) return null;

		const { password: pwd, ...userWithoutPassword } = user;
		return userWithoutPassword;
	},
};

module.exports = User;
