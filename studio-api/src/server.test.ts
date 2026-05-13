import { describe, it, expect } from 'vitest';
import request from 'supertest';
import app from './server.js';

describe('Studio API', () => {
  it('GET /api/health returns ok', async () => {
    const res = await request(app).get('/api/health');
    expect(res.status).toBe(200);
    expect(res.body.status).toBe('ok');
    expect(res.body.version).toBe('0.1.0');
  });

  it('GET /api/tracks returns 9 tracks', async () => {
    const res = await request(app).get('/api/tracks');
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(9);
  });

  it('GET /api/modes returns 13 modes', async () => {
    const res = await request(app).get('/api/modes');
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(13);
  });

  it('GET /api/providers returns 4 providers', async () => {
    const res = await request(app).get('/api/providers');
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(4);
  });

  it('full session lifecycle: create, message, finish', async () => {
    // Create session
    const createRes = await request(app)
      .post('/api/sessions')
      .send({ track: 'senior-frontend', mode: 'behavioral', provider: 'mock' });
    expect(createRes.status).toBe(201);
    expect(createRes.body.status).toBe('active');
    expect(createRes.body.messages.length).toBeGreaterThanOrEqual(3);

    const sessionId = createRes.body.id;

    // Send a message
    const msgRes = await request(app)
      .post(`/api/sessions/${sessionId}/messages`)
      .send({ content: 'In my last role, I led a migration from a legacy jQuery app to Angular.' });
    expect(msgRes.status).toBe(200);
    expect(msgRes.body.messages.length).toBeGreaterThan(createRes.body.messages.length);

    // Finish session
    const finishRes = await request(app).post(`/api/sessions/${sessionId}/finish`);
    expect(finishRes.status).toBe(200);
    expect(finishRes.body.status).toBe('finished');
    expect(finishRes.body.scorecard).toBeDefined();
    expect(finishRes.body.studyPlan).toBeDefined();

    // List sessions
    const listRes = await request(app).get('/api/sessions');
    expect(listRes.status).toBe(200);
    expect(listRes.body.length).toBeGreaterThanOrEqual(1);

    // Get session by id
    const getRes = await request(app).get(`/api/sessions/${sessionId}`);
    expect(getRes.status).toBe(200);
    expect(getRes.body.id).toBe(sessionId);
  });

  it('returns 404 for non-existent session', async () => {
    const res = await request(app).get('/api/sessions/nonexistent');
    expect(res.status).toBe(404);
  });

  it('returns 400 when creating session without required fields', async () => {
    const res = await request(app).post('/api/sessions').send({ track: 'test' });
    expect(res.status).toBe(400);
  });
});
