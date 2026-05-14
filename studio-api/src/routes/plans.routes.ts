import { Router } from 'express';
import { plans } from '../config/plans.js';

const router = Router();

router.get('/plans', (_req, res) => {
  res.json(plans);
});

export default router;
