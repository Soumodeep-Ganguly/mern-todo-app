const express = require('express');
const router = express.Router();
const taskController = require('./../controllers/taskController')
const { authenticateToken } = require('./../utils/auth')

router.get('/tasks', authenticateToken, taskController.get);

router.post('/tasks', authenticateToken, taskController.create);

router.put('/tasks/:id', authenticateToken, taskController.update);

router.delete('/tasks/:id', authenticateToken, taskController.delete);

module.exports = router;