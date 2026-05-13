import { Router } from 'express';
import { sessionStore } from '../services/session-store.service.js';
import { createSession } from '../services/interview-engine.service.js';

const router = Router();

router.get('/sessions', (_req, res) => {
  res.json(sessionStore.getAll());
});

router.post('/sessions', (req, res) => {
  const { track, mode, provider } = req.body as { track: string; mode: string; provider: string };
  if (!track || !mode || !provider) {
    res.status(400).json({ error: 'track, mode, and provider are required.' });
    return;
  }
  const session = createSession(track, mode, provider);
  res.status(201).json(session);
});

router.get('/sessions/:id', (req, res) => {
  const session = sessionStore.get(req.params.id);
  if (!session) {
    res.status(404).json({ error: 'Session not found.' });
    return;
  }
  res.json(session);
});

export default router;
