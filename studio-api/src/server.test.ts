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

  // --- Phase 2: Profile tests ---

  it('GET /api/profile returns default profile', async () => {
    const res = await request(app).get('/api/profile');
    expect(res.status).toBe(200);
    expect(res.body.id).toBe('default');
    expect(res.body.focusAreas).toBeDefined();
  });

  it('PUT /api/profile updates profile', async () => {
    const res = await request(app)
      .put('/api/profile')
      .send({ targetCompany: 'Acme Corp', targetRole: 'Senior Engineer', focusAreas: ['system-design'] });
    expect(res.status).toBe(200);
    expect(res.body.targetCompany).toBe('Acme Corp');
    expect(res.body.targetRole).toBe('Senior Engineer');
  });

  it('POST /api/profile/resume stores resume text', async () => {
    const res = await request(app)
      .post('/api/profile/resume')
      .send({ text: 'Experienced frontend engineer with React and Angular expertise.' });
    expect(res.status).toBe(200);
    expect(res.body.resumeText).toContain('frontend engineer');
  });

  it('POST /api/profile/jd stores job description text', async () => {
    const res = await request(app)
      .post('/api/profile/jd')
      .send({ text: 'Looking for a senior engineer with system design experience.' });
    expect(res.status).toBe(200);
    expect(res.body.jobDescriptionText).toContain('senior engineer');
  });

  // --- Phase 2: Readiness Report tests ---

  it('POST and GET /api/sessions/:id/readiness-report works', async () => {
    // Create and finish a session first
    const createRes = await request(app)
      .post('/api/sessions')
      .send({ track: 'senior-frontend', mode: 'coding', provider: 'mock' });
    const sessionId = createRes.body.id;

    await request(app)
      .post(`/api/sessions/${sessionId}/messages`)
      .send({ content: 'I would use a hash set for O(1) lookups.' });

    await request(app).post(`/api/sessions/${sessionId}/finish`);

    // Generate report
    const reportRes = await request(app).post(`/api/sessions/${sessionId}/readiness-report`);
    expect(reportRes.status).toBe(201);
    expect(reportRes.body.readinessScore).toBeGreaterThan(0);
    expect(reportRes.body.hireSignal).toBeDefined();
    expect(reportRes.body.strengths.length).toBeGreaterThan(0);
    expect(reportRes.body.weaknessMap.length).toBeGreaterThanOrEqual(3);
    expect(reportRes.body.sevenDayPlan.length).toBeGreaterThan(0);

    // Retrieve report
    const getRes = await request(app).get(`/api/sessions/${sessionId}/readiness-report`);
    expect(getRes.status).toBe(200);
    expect(getRes.body.sessionId).toBe(sessionId);
  });

  // --- Phase 2: STAR Story CRUD tests ---

  it('STAR story CRUD lifecycle', async () => {
    // Create
    const createRes = await request(app)
      .post('/api/star-stories')
      .send({
        title: 'Led Angular migration',
        category: 'leadership',
        situation: 'Legacy jQuery app needed modernization.',
        task: 'Lead the migration to Angular.',
        action: 'Created migration plan, trained team, built shared components.',
        result: 'Reduced bug count by 40%, improved dev velocity.',
        metrics: '40% fewer bugs, 2x deployment frequency',
        tags: ['angular', 'migration', 'leadership'],
      });
    expect(createRes.status).toBe(201);
    expect(createRes.body.id).toBeDefined();
    expect(createRes.body.title).toBe('Led Angular migration');

    const storyId = createRes.body.id;

    // Get all
    const listRes = await request(app).get('/api/star-stories');
    expect(listRes.status).toBe(200);
    expect(listRes.body.length).toBeGreaterThanOrEqual(1);

    // Get by id
    const getRes = await request(app).get(`/api/star-stories/${storyId}`);
    expect(getRes.status).toBe(200);
    expect(getRes.body.title).toBe('Led Angular migration');

    // Update
    const updateRes = await request(app)
      .put(`/api/star-stories/${storyId}`)
      .send({ title: 'Led Angular 17 migration' });
    expect(updateRes.status).toBe(200);
    expect(updateRes.body.title).toBe('Led Angular 17 migration');

    // Delete
    const deleteRes = await request(app).delete(`/api/star-stories/${storyId}`);
    expect(deleteRes.status).toBe(204);

    // Verify deleted
    const verifyRes = await request(app).get(`/api/star-stories/${storyId}`);
    expect(verifyRes.status).toBe(404);
  });

  // --- Phase 2: Dashboard tests ---

  it('GET /api/dashboard/summary returns summary', async () => {
    const res = await request(app).get('/api/dashboard/summary');
    expect(res.status).toBe(200);
    expect(res.body.totalSessions).toBeDefined();
    expect(typeof res.body.totalSessions).toBe('number');
    expect(res.body.sessionsByMode).toBeDefined();
    expect(res.body.recommendedNextMode).toBeDefined();
  });

  // --- Phase 2: Export tests ---

  it('GET /api/sessions/:id/export/markdown returns markdown', async () => {
    const createRes = await request(app)
      .post('/api/sessions')
      .send({ track: 'senior-frontend', mode: 'behavioral', provider: 'mock' });
    const sessionId = createRes.body.id;

    const res = await request(app).get(`/api/sessions/${sessionId}/export/markdown`);
    expect(res.status).toBe(200);
    expect(res.headers['content-type']).toContain('text/markdown');
    expect(res.text).toContain('# Interview Practice Session');
    expect(res.text).toContain('behavioral');
  });

  it('GET /api/sessions/:id/export/html returns html', async () => {
    const createRes = await request(app)
      .post('/api/sessions')
      .send({ track: 'senior-frontend', mode: 'behavioral', provider: 'mock' });
    const sessionId = createRes.body.id;

    const res = await request(app).get(`/api/sessions/${sessionId}/export/html`);
    expect(res.status).toBe(200);
    expect(res.headers['content-type']).toContain('text/html');
    expect(res.text).toContain('<!DOCTYPE html>');
    expect(res.text).toContain('InterviewOps Studio');
  });
});
