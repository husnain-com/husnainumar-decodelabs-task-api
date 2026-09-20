const store = require('../data/store');
const { validateTaskInput } = require('../validators/task.validator');

// GET /api/tasks
const getAllTasks = (req, res) => {
  const tasks = store.findAll();
  res.status(200).json({
    success: true,
    count: tasks.length,
    data: tasks
  });
};

// GET /api/tasks/:id
const getTaskById = (req, res) => {
  if (!/^\d+$/.test(req.params.id)) {
    return res.status(400).json({
      success: false,
      error: 'Task id must be a positive whole number'
    });
  }

  const task = store.findById(Number(req.params.id));
  if (!task) {
    return res.status(404).json({
      success: false,
      error: `Task with id ${req.params.id} not found`
    });
  }

  res.status(200).json({ success: true, data: task });
};

// POST /api/tasks
const createTask = (req, res) => {
  const { errors, value } = validateTaskInput(req.body);

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      error: 'Validation failed',
      details: errors
    });
  }

  const task = store.create(value);
  res.status(201).json({
    success: true,
    message: 'Task created successfully',
    data: task
  });
};

module.exports = { getAllTasks, getTaskById, createTask };
