import { Router } from 'express';
import { sessionStore } from '../services/session-store.service.js';
import { createSession } from '../services/interview-engine.service.js';

const router = Router();

router.get('/sessions', async (_req, res) => {
  try {
    const sessions = await sessionStore.getAll();
    res.json(sessions);
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    res.status(500).json({ error: message });
  }
});

router.post('/sessions', async (req, res) => {
  try {
    const { track, mode, provider, candidateProfileId } = req.body as {
      track: string;
      mode: string;
      provider: string;
      candidateProfileId?: string;
    };
    if (!track || !mode || !provider) {
      res.status(400).json({ error: 'track, mode, and provider are required.' });
      return;
    }
    const session = await createSession(track, mode, provider, candidateProfileId);
    res.status(201).json(session);
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    res.status(500).json({ error: message });
  }
});

router.get('/sessions/:id', async (req, res) => {
  try {
    const session = await sessionStore.get(req.params['id']);
    if (!session) {
      res.status(404).json({ error: 'Session not found.' });
      return;
    }
    res.json(session);
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    res.status(500).json({ error: message });
  }
});

export default router;
