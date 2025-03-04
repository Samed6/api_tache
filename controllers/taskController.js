// Contrôleur pour les tâches
const Task = require('../models/Task');

// Méthodes du contrôleur
const taskController = {
  // Récupérer toutes les tâches
  getAllTasks: (req, res) => {
    try {
      const tasks = Task.getAll();
      res.status(200).json({
        success: true,
        count: tasks.length,
        data: tasks
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Erreur lors de la récupération des tâches",
        error: error.message
      });
    }
  },

  // Récupérer une tâche par son ID
  getTaskById: (req, res) => {
    try {
      const task = Task.getById(req.params.id);
      
      if (!task) {
        return res.status(404).json({
          success: false,
          message: "Tâche non trouvée"
        });
      }

      res.status(200).json({
        success: true,
        data: task
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Erreur lors de la récupération de la tâche",
        error: error.message
      });
    }
  },

  // Créer une nouvelle tâche
  createTask: (req, res) => {
    try {
      // Vérifier si les données requises sont présentes
      if (!req.body.title) {
        return res.status(400).json({
          success: false,
          message: "Le titre de la tâche est requis"
        });
      }

      const newTask = Task.create(req.body);
      
      res.status(201).json({
        success: true,
        message: "Tâche créée avec succès",
        data: newTask
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Erreur lors de la création de la tâche",
        error: error.message
      });
    }
  },

  // Mettre à jour une tâche
  updateTask: (req, res) => {
    try {
      const updatedTask = Task.update(req.params.id, req.body);
      
      if (!updatedTask) {
        return res.status(404).json({
          success: false,
          message: "Tâche non trouvée"
        });
      }

      res.status(200).json({
        success: true,
        message: "Tâche mise à jour avec succès",
        data: updatedTask
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Erreur lors de la mise à jour de la tâche",
        error: error.message
      });
    }
  },

  // Supprimer une tâche
  deleteTask: (req, res) => {
    try {
      const result = Task.delete(req.params.id);
      
      if (!result) {
        return res.status(404).json({
          success: false,
          message: "Tâche non trouvée"
        });
      }

      res.status(200).json({
        success: true,
        message: "Tâche supprimée avec succès"
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Erreur lors de la suppression de la tâche",
        error: error.message
      });
    }
  }
};

module.exports = taskController; 