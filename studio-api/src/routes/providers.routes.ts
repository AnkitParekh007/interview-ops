import { Router } from 'express';

const router = Router();

const providers = [
  { id: 'mock', name: 'Mock (Offline)', description: 'Built-in mock interviewer. No API key required.', requiresKey: false },
  { id: 'openai', name: 'OpenAI', description: 'GPT-4o powered interviews via OpenAI API.', requiresKey: true },
  { id: 'anthropic', name: 'Anthropic', description: 'Claude-powered interviews via Anthropic API.', requiresKey: true },
  { id: 'gemini', name: 'Gemini', description: 'Gemini-powered interviews via Google AI API.', requiresKey: true },
];

router.get('/providers', (_req, res) => {
  res.json(providers);
});

export default router;
