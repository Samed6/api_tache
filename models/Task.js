// Modèle de données pour les tâches
// Comme nous n'utilisons pas de base de données, nous allons stocker les tâches en mémoire

// Tableau pour stocker les tâches
let tasks = [
  {
    id: 1,
    title: "Apprendre Node.js",
    description: "Étudier les concepts de base de Node.js et Express",
    status: "en cours",
    createdAt: new Date().toISOString()
  },
  {
    id: 2,
    title: "Créer une API REST",
    description: "Développer une API RESTful pour la gestion de tâches",
    status: "à faire",
    createdAt: new Date().toISOString()
  }
];

// Compteur pour générer des IDs uniques
let nextId = 3;

// Méthodes pour manipuler les tâches
const Task = {
  // Récupérer toutes les tâches
  getAll: () => {
    return tasks;
  },

  // Récupérer une tâche par son ID
  getById: (id) => {
    return tasks.find(task => task.id === parseInt(id));
  },

  // Créer une nouvelle tâche
  create: (taskData) => {
    const newTask = {
      id: nextId++,
      title: taskData.title,
      description: taskData.description,
      status: taskData.status || "à faire",
      createdAt: new Date().toISOString()
    };
    tasks.push(newTask);
    return newTask;
  },

  // Mettre à jour une tâche existante
  update: (id, taskData) => {
    const index = tasks.findIndex(task => task.id === parseInt(id));
    if (index === -1) return null;

    const updatedTask = {
      ...tasks[index],
      title: taskData.title || tasks[index].title,
      description: taskData.description || tasks[index].description,
      status: taskData.status || tasks[index].status,
      updatedAt: new Date().toISOString()
    };

    tasks[index] = updatedTask;
    return updatedTask;
  },

  // Supprimer une tâche
  delete: (id) => {
    const index = tasks.findIndex(task => task.id === parseInt(id));
    if (index === -1) return false;

    tasks.splice(index, 1);
    return true;
  }
};

module.exports = Task; 