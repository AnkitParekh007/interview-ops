import { Router } from 'express';
import { getProfile, updateProfile } from '../services/profile.service.js';

const router = Router();

router.get('/profile', async (_req, res) => {
  try {
    const profile = await getProfile();
    if (!profile) {
      res.json({
        id: 'default',
        focusAreas: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });
      return;
    }
    res.json(profile);
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    res.status(500).json({ error: message });
  }
});

router.put('/profile', async (req, res) => {
  try {
    const updated = await updateProfile(req.body);
    res.json(updated);
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    res.status(500).json({ error: message });
  }
});

router.post('/profile/resume', async (req, res) => {
  try {
    const { text } = req.body as { text: string };
    if (!text) {
      res.status(400).json({ error: 'text is required.' });
      return;
    }
    const updated = await updateProfile({ resumeText: text });
    res.json(updated);
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    res.status(500).json({ error: message });
  }
});

router.post('/profile/jd', async (req, res) => {
  try {
    const { text } = req.body as { text: string };
    if (!text) {
      res.status(400).json({ error: 'text is required.' });
      return;
    }
    const updated = await updateProfile({ jobDescriptionText: text });
    res.json(updated);
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    res.status(500).json({ error: message });
  }
});

export default router;
