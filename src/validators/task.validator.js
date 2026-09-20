const PRIORITIES = ['low', 'medium', 'high'];

const isValidDate = (value) => {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const date = new Date(`${value}T00:00:00Z`);
  return !Number.isNaN(date.getTime()) && date.toISOString().slice(0, 10) === value;
};

/**
 * Validates and cleans the POST /api/tasks body.
 * Returns { errors: [...], value: {...} }
 */
const validateTaskInput = (body) => {
  const errors = [];

  if (body === null || typeof body !== 'object' || Array.isArray(body)) {
    return {
      errors: ['Request body must be a JSON object (send Content-Type: application/json)'],
      value: null
    };
  }

  // title: required string, 3-100 chars
  let title = body.title;
  if (title === undefined || title === null || title === '') {
    errors.push('title is required');
  } else if (typeof title !== 'string') {
    errors.push('title must be a string');
  } else {
    title = title.trim();
    if (title.length < 3 || title.length > 100) {
      errors.push('title must be between 3 and 100 characters');
    }
  }

  // description: optional string, max 500 chars
  let description = body.description;
  if (description === undefined || description === null) {
    description = '';
  } else if (typeof description !== 'string') {
    errors.push('description must be a string');
  } else {
    description = description.trim();
    if (description.length > 500) {
      errors.push('description must be 500 characters or fewer');
    }
  }

  // priority: optional, must be low | medium | high (default medium)
  let priority = body.priority;
  if (priority === undefined || priority === null) {
    priority = 'medium';
  } else if (typeof priority !== 'string' || !PRIORITIES.includes(priority.toLowerCase())) {
    errors.push(`priority must be one of: ${PRIORITIES.join(', ')}`);
  } else {
    priority = priority.toLowerCase();
  }

  // dueDate: optional, YYYY-MM-DD real calendar date
  let dueDate = body.dueDate;
  if (dueDate === undefined || dueDate === null) {
    dueDate = null;
  } else if (typeof dueDate !== 'string' || !isValidDate(dueDate)) {
    errors.push('dueDate must be a valid date in YYYY-MM-DD format');
  }

  return { errors, value: { title, description, priority, dueDate } };
};

module.exports = { validateTaskInput };
