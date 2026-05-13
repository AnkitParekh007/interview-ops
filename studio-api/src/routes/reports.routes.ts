import { Router } from 'express';
import { sessionStore } from '../services/session-store.service.js';
import { generateReadinessReport, getReadinessReport } from '../services/readiness-report.service.js';

const router = Router();

router.post('/sessions/:id/readiness-report', async (req, res) => {
  try {
    const session = await sessionStore.get(req.params['id']);
    if (!session) {
      res.status(404).json({ error: 'Session not found.' });
      return;
    }
    if (session.status !== 'finished') {
      res.status(400).json({ error: 'Session must be finished before generating a readiness report.' });
      return;
    }
    const report = await generateReadinessReport(session);
    res.status(201).json(report);
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    res.status(500).json({ error: message });
  }
});

router.get('/sessions/:id/readiness-report', async (req, res) => {
  try {
    const report = await getReadinessReport(req.params['id']);
    if (!report) {
      res.status(404).json({ error: 'Readiness report not found.' });
      return;
    }
    res.json(report);
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    res.status(500).json({ error: message });
  }
});

export default router;
