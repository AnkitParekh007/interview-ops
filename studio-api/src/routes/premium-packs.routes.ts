import { Router } from 'express';
import { premiumPacks } from '../config/premium-packs.js';

const router = Router();

router.get('/premium-packs', (_req, res) => {
  res.json(premiumPacks);
});

export default router;
