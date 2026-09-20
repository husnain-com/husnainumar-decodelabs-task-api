// Simple in-memory data store (no database needed for this project).
// Data resets whenever the server restarts.

const tasks = [
  {
    id: 1,
    title: 'Learn REST API basics',
    description: 'Understand GET and POST methods',
    priority: 'high',
    dueDate: null,
    completed: false,
    createdAt: new Date().toISOString()
  }
];

let nextId = 2;

const findAll = () => tasks;

const findById = (id) => tasks.find((task) => task.id === id);

const create = ({ title, description, priority, dueDate }) => {
  const task = {
    id: nextId++,
    title,
    description,
    priority,
    dueDate,
    completed: false,
    createdAt: new Date().toISOString()
  };
  tasks.push(task);
  return task;
};

module.exports = { findAll, findById, create };
