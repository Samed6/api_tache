// Routes pour les tâches
const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const auth = require('../middlewares/auth');

// Routes publiques
router.get('/', taskController.getAllTasks);
router.get('/:id', taskController.getTaskById);

// Routes protégées (nécessitent une authentification)
router.post('/', auth, taskController.createTask);
router.put('/:id', auth, taskController.updateTask);
router.delete('/:id', auth, taskController.deleteTask);

module.exports = router; 