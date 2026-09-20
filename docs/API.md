# API Documentation

Base URL (local): `http://localhost:3000`

All responses are JSON. Successful responses contain `"success": true`; errors contain `"success": false` and an `error` message.

## GET /api/health
Returns server status. **200 OK**
```json
{ "success": true, "status": "ok", "uptimeSeconds": 12, "timestamp": "2026-09-20T06:55:24.427Z" }
```

## GET /api/tasks
Returns all tasks. **200 OK**
```json
{
  "success": true,
  "count": 1,
  "data": [
    {
      "id": 1,
      "title": "Learn REST API basics",
      "description": "Understand GET and POST methods",
      "priority": "high",
      "dueDate": null,
      "completed": false,
      "createdAt": "2026-09-20T06:55:24.427Z"
    }
  ]
}
```

## GET /api/tasks/:id
Returns one task.

| Status | When |
|--------|------|
| 200 | Task found |
| 400 | `id` is not a positive whole number |
| 404 | No task with that id |

```json
{ "success": false, "error": "Task with id 9999 not found" }
```

## POST /api/tasks
Creates a task. Header: `Content-Type: application/json`

Body:
```json
{ "title": "Write README", "description": "Optional", "priority": "medium", "dueDate": "2026-12-31" }
```

| Status | When |
|--------|------|
| 201 | Task created |
| 400 | Validation failed, missing/invalid body, or malformed JSON |
| 413 | Body larger than 10 KB |
| 500 | Unexpected server error |

Validation error example:
```json
{
  "success": false,
  "error": "Validation failed",
  "details": ["title is required"]
}
```

Malformed JSON example:
```json
{ "success": false, "error": "Invalid JSON in request body" }
```

## Unknown routes
Any unmatched route returns **404**:
```json
{ "success": false, "error": "Route not found: GET /nope" }
```
