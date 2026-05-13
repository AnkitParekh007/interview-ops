import { Router } from 'express';
import { getAllStories, getStory, createStory, updateStory, deleteStory } from '../services/star-story.service.js';

const router = Router();

router.get('/star-stories', async (_req, res) => {
  try {
    const stories = await getAllStories();
    res.json(stories);
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    res.status(500).json({ error: message });
  }
});

router.post('/star-stories', async (req, res) => {
  try {
    const story = await createStory(req.body);
    res.status(201).json(story);
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    res.status(500).json({ error: message });
  }
});

router.get('/star-stories/:id', async (req, res) => {
  try {
    const story = await getStory(req.params['id']);
    if (!story) {
      res.status(404).json({ error: 'STAR story not found.' });
      return;
    }
    res.json(story);
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    res.status(500).json({ error: message });
  }
});

router.put('/star-stories/:id', async (req, res) => {
  try {
    const updated = await updateStory(req.params['id'], req.body);
    if (!updated) {
      res.status(404).json({ error: 'STAR story not found.' });
      return;
    }
    res.json(updated);
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    res.status(500).json({ error: message });
  }
});

router.delete('/star-stories/:id', async (req, res) => {
  try {
    const deleted = await deleteStory(req.params['id']);
    if (!deleted) {
      res.status(404).json({ error: 'STAR story not found.' });
      return;
    }
    res.status(204).send();
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    res.status(500).json({ error: message });
  }
});

export default router;
