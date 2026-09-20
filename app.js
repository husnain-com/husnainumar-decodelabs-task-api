const express = require('express');
const taskRoutes = require('./routes/tasks.routes');
const { notFound, errorHandler } = require('./middleware/errorHandler');

const app = express();

// Parse incoming JSON bodies (Content-Type: application/json)
app.use(express.json({ limit: '10kb' }));

// Root: API overview
app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'DecodeLabs Task API is running',
    endpoints: {
      health: 'GET /api/health',
      listTasks: 'GET /api/tasks',
      getTask: 'GET /api/tasks/:id',
      createTask: 'POST /api/tasks'
    }
  });
});

// Health check
app.get('/api/health', (req, res) => {
  res.status(200).json({
    success: true,
    status: 'ok',
    uptimeSeconds: Math.round(process.uptime()),
    timestamp: new Date().toISOString()
  });
});

// Resource routes
app.use('/api/tasks', taskRoutes);

// 404 + centralized error handling (must be last)
app.use(notFound);
app.use(errorHandler);

module.exports = app;
