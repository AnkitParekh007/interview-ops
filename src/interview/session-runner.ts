import { loadTrack } from './track-loader.js';
import { loadMode } from './mode-loader.js';
import { loadRubricForMode } from './rubric-loader.js';
import { buildSimulatePrompt } from './prompt-builder.js';
import { getProvider } from '../providers/provider-registry.js';
import { loadConfig } from '../config/config.loader.js';
import { sessionId } from '../utils/slug.js';
import type { InterviewSession } from './interview-session.types.js';

export interface RunSessionOptions {
  track: string;
  mode: string;
  duration?: number;
  providerName?: string;
}

export async function runSession(options: RunSessionOptions): Promise<InterviewSession> {
  const { track, mode, duration = 45, providerName } = options;

  const config = loadConfig();
  const provider = getProvider(providerName ?? config.model.provider);

  const trackContent = loadTrack(track);
  const modeContent = loadMode(mode);
  const rubricContent = loadRubricForMode(mode, track);

  const prompt = buildSimulatePrompt(
    track,
    mode,
    duration,
    config,
    trackContent,
    modeContent,
    rubricContent,
  );

  const response = await provider.generateCompletion(prompt);

  const id = sessionId(track, mode);
  const date = new Date().toISOString().split('T')[0];

  const session: InterviewSession = {
    metadata: {
      id,
      track,
      mode,
      date: date ?? new Date().toISOString(),
      durationMinutes: duration,
      provider: response.provider,
      model: response.model,
      version: '0.1.0',
    },
    rawContent: response.content,
    ethicsNotice: {
      statement:
        'InterviewOps is a practice-only tool. It is strictly prohibited for use during live interviews.',
      allowedUses: [
        'Practicing interview answers before your interview',
        'Reviewing technical knowledge and concepts',
        'Generating study plans and preparation guides',
        'Improving communication and storytelling skills',
      ],
      prohibitedUses: [
        'Use during a live interview',
        'Real-time answer injection',
        'Hidden overlay during screen sharing',
        'Impersonating another person',
        'Any form of live interview cheating',
      ],
      generatedAt: new Date().toISOString(),
    },
  };

  return session;
}
