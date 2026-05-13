import { Router } from 'express';
import { addCandidateMessage, finishSession } from '../services/interview-engine.service.js';

const router = Router();

router.post('/sessions/:id/messages', (req, res) => {
  try {
    const { content } = req.body as { content: string };
    if (!content) {
      res.status(400).json({ error: 'content is required.' });
      return;
    }
    const session = addCandidateMessage(req.params.id, content);
    res.json(session);
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    res.status(404).json({ error: message });
  }
});

router.post('/sessions/:id/finish', (req, res) => {
  try {
    const session = finishSession(req.params.id);
    res.json(session);
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    res.status(404).json({ error: message });
  }
});

export default router;
