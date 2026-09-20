# DecodeLabs Task API

A simple REST backend API built for **DecodeLabs Full Stack Development — Project 2: Backend API Development**.

The API manages tasks: clients can list tasks, fetch one task, and create a new task. All input is validated on the server and every response is JSON with a meaningful HTTP status code.

## Features

- `GET` endpoints to retrieve tasks
- `POST` endpoint to create a task from JSON input
- Server-side validation (never trust the client)
- Correct HTTP status codes: 200, 201, 400, 404, 413, 500
- Consistent JSON success and error responses
- Centralized error handling (bad input never crashes the server)
- In-memory data store (no database required)
- Automated tests using Node's built-in test runner

## Technologies

- Node.js (18+)
- Express.js 4

## Project Structure

```
decodelabs-task-api/
├── server.js                      # Starts the server
├── package.json
├── .env.example
├── .gitignore
├── README.md
├── docs/
│   └── API.md                     # Full endpoint documentation
├── src/
│   ├── app.js                     # Express app, routes, middleware
│   ├── routes/tasks.routes.js     # Route definitions
│   ├── controllers/tasks.controller.js  # Request/response logic
│   ├── validators/task.validator.js     # Input validation
│   ├── data/store.js              # In-memory data layer
│   └── middleware/errorHandler.js # 404 + error handling
└── tests/
    └── api.test.js                # Automated endpoint tests
```

## Installation

```bash
git clone <your-repository-url>
cd decodelabs-task-api
npm install
```

## Run the Server

```bash
npm start
```

The server runs at `http://localhost:3000` (set `PORT` to change it; see `.env.example`).

## Run the Tests

```bash
npm test
```

## API Endpoints

| Method | URL | Description | Success |
|--------|-----|-------------|---------|
| GET | `/` | API overview | 200 |
| GET | `/api/health` | Health check | 200 |
| GET | `/api/tasks` | List all tasks | 200 |
| GET | `/api/tasks/:id` | Get one task | 200 |
| POST | `/api/tasks` | Create a task | 201 |

Full details: [docs/API.md](docs/API.md)

### Example GET request

```bash
curl http://localhost:3000/api/tasks
```

### Example POST request

```bash
curl -X POST http://localhost:3000/api/tasks \
  -H "Content-Type: application/json" \
  -d '{"title":"Deploy API to Render","description":"Final step","priority":"high","dueDate":"2026-10-01"}'
```

### Example request body

```json
{
  "title": "Deploy API to Render",
  "description": "Final step",
  "priority": "high",
  "dueDate": "2026-10-01"
}
```

### Example success response (201 Created)

```json
{
  "success": true,
  "message": "Task created successfully",
  "data": {
    "id": 2,
    "title": "Deploy API to Render",
    "description": "Final step",
    "priority": "high",
    "dueDate": "2026-10-01",
    "completed": false,
    "createdAt": "2026-09-20T06:55:25.390Z"
  }
}
```

### Example validation error response (400 Bad Request)

```json
{
  "success": false,
  "error": "Validation failed",
  "details": [
    "title must be between 3 and 100 characters",
    "priority must be one of: low, medium, high"
  ]
}
```

## Validation Rules (POST /api/tasks)

| Field | Required | Rule |
|-------|----------|------|
| title | Yes | String, 3–100 characters |
| description | No | String, up to 500 characters |
| priority | No | `low`, `medium` or `high` (default `medium`) |
| dueDate | No | Real calendar date, `YYYY-MM-DD` |

## Project Requirements Fulfilled

- Simple backend API handling application logic
- GET and POST API endpoints
- User input handled and returned as responses
- Basic data validation
- Proper HTTP status codes and JSON responses
- RESTful naming (resources are nouns, methods are verbs)

## Note on Data

Tasks are stored in memory, so data resets when the server restarts. This is intentional: the project focuses on API logic before introducing databases.

## Author

Husnain — BS Computer Science graduate, MERN stack developer.
