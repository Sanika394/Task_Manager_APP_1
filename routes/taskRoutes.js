const express = require('express');
const router = express.Router();

const {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
   markTaskCompleted, 
} = require('../controllers/taskController');

const auth = require('../middleware/authMiddleware');

// 🔐 Protect all task routes
router.use(auth);

// 📌 Create a new task
router.post('/', createTask);

// 📌 Get all tasks of the logged-in user
router.get('/', getTasks);

// 📌 Update a task by ID (only if it belongs to the user)
router.put('/:id', updateTask);

// 📌 Delete a task by ID (only if it belongs to the user)
router.delete('/:id', deleteTask);

router.patch('/:id/complete', markTaskCompleted);

module.exports = router;
