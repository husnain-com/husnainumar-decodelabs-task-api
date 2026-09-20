const express = require('express');
const { getAllTasks, getTaskById, createTask } = require('../controllers/tasks.controller');

const router = express.Router();

router.get('/', getAllTasks);
router.get('/:id', getTaskById);
router.post('/', createTask);

module.exports = router;
