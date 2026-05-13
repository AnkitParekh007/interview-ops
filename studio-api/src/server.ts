import express from 'express';
import cors from 'cors';
import healthRoutes from './routes/health.routes.js';
import tracksRoutes from './routes/tracks.routes.js';
import modesRoutes from './routes/modes.routes.js';
import providersRoutes from './routes/providers.routes.js';
import sessionsRoutes from './routes/sessions.routes.js';
import messagesRoutes from './routes/messages.routes.js';

const app = express();
app.use(cors({ origin: 'http://localhost:4200' }));
app.use(express.json());

app.use('/api', healthRoutes);
app.use('/api', tracksRoutes);
app.use('/api', modesRoutes);
app.use('/api', providersRoutes);
app.use('/api', sessionsRoutes);
app.use('/api', messagesRoutes);

const PORT = 4317;

if (process.env['NODE_ENV'] !== 'test') {
  app.listen(PORT, () => {
    console.log(`InterviewOps Studio API running at http://localhost:${PORT}`);
  });
}

export default app;
