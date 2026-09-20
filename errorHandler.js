// Handles requests to routes that do not exist
const notFound = (req, res) => {
  res.status(404).json({
    success: false,
    error: `Route not found: ${req.method} ${req.originalUrl}`
  });
};

// Centralized error handler: the server never crashes on bad input
// eslint-disable-next-line no-unused-vars
const errorHandler = (err, req, res, next) => {
  // Malformed JSON body
  if (err.type === 'entity.parse.failed') {
    return res.status(400).json({
      success: false,
      error: 'Invalid JSON in request body'
    });
  }

  // Body too large
  if (err.type === 'entity.too.large') {
    return res.status(413).json({
      success: false,
      error: 'Request body is too large'
    });
  }

  console.error(err);
  res.status(500).json({
    success: false,
    error: 'Internal server error'
  });
};

module.exports = { notFound, errorHandler };
