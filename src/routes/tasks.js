const express = require('express');
const swaggerUi = require('swagger-ui-express');

const {addTask, updateTask, getTasks, getTasksMetrics, swaggerDocument } = require('../controllers/tasks');

const router = express.Router();
router.post('/task', addTask);
router.put('/task/:id', updateTask);
router.get('/tasks', getTasks);
router.get('/tasks/metrics', getTasksMetrics);

module.exports = router;