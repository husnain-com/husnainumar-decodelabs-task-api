const test = require('node:test');
const assert = require('node:assert');
const app = require('../src/app');

let server;
let base;

test.before(async () => {
  await new Promise((resolve) => {
    server = app.listen(0, resolve);
  });
  base = `http://127.0.0.1:${server.address().port}`;
});

test.after(() => server.close());

const post = (body, raw = false) =>
  fetch(`${base}/api/tasks`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: raw ? body : JSON.stringify(body)
  });

test('GET /api/tasks returns 200 and a list', async () => {
  const res = await fetch(`${base}/api/tasks`);
  const json = await res.json();
  assert.strictEqual(res.status, 200);
  assert.strictEqual(json.success, true);
  assert.ok(Array.isArray(json.data));
});

test('POST /api/tasks with valid data returns 201', async () => {
  const res = await post({ title: 'Write README', priority: 'HIGH', dueDate: '2026-12-31' });
  const json = await res.json();
  assert.strictEqual(res.status, 201);
  assert.strictEqual(json.data.title, 'Write README');
  assert.strictEqual(json.data.priority, 'high');
  assert.ok(json.data.id);
});

test('created task can be fetched with GET /api/tasks/:id', async () => {
  const created = await (await post({ title: 'Fetch me' })).json();
  const res = await fetch(`${base}/api/tasks/${created.data.id}`);
  assert.strictEqual(res.status, 200);
});

test('POST with missing title returns 400', async () => {
  const res = await post({ description: 'no title' });
  const json = await res.json();
  assert.strictEqual(res.status, 400);
  assert.ok(json.details.includes('title is required'));
});

test('POST with invalid data returns 400 with all errors', async () => {
  const res = await post({ title: 'ab', priority: 'urgent', dueDate: '2026-02-30' });
  const json = await res.json();
  assert.strictEqual(res.status, 400);
  assert.strictEqual(json.details.length, 3);
});

test('POST with non-string title returns 400', async () => {
  const res = await post({ title: 12345 });
  assert.strictEqual(res.status, 400);
});

test('POST with malformed JSON returns 400', async () => {
  const res = await post('{"title": "broken"', true);
  const json = await res.json();
  assert.strictEqual(res.status, 400);
  assert.strictEqual(json.error, 'Invalid JSON in request body');
});

test('POST without JSON body returns 400', async () => {
  const res = await fetch(`${base}/api/tasks`, { method: 'POST' });
  assert.strictEqual(res.status, 400);
});

test('GET unknown task id returns 404', async () => {
  const res = await fetch(`${base}/api/tasks/9999`);
  assert.strictEqual(res.status, 404);
});

test('GET invalid task id returns 400', async () => {
  const res = await fetch(`${base}/api/tasks/abc`);
  assert.strictEqual(res.status, 400);
});

test('unknown route returns JSON 404', async () => {
  const res = await fetch(`${base}/api/does-not-exist`);
  const json = await res.json();
  assert.strictEqual(res.status, 404);
  assert.strictEqual(json.success, false);
});

test('oversized body returns 413 (server stays alive)', async () => {
  const res = await post({ title: 'x'.repeat(20000) });
  assert.strictEqual(res.status, 413);
  const health = await fetch(`${base}/api/health`);
  assert.strictEqual(health.status, 200);
});
