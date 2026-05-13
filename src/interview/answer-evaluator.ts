import path from 'path';
import { buildAnswerEvalPrompt } from './prompt-builder.js';
import { loadRubricForMode } from './rubric-loader.js';
import { getProvider } from '../providers/provider-registry.js';
import { loadConfig } from '../config/config.loader.js';
import { fileExists, readFile } from '../utils/fs-utils.js';

export interface EvaluateAnswerOptions {
  answer: string;
  sessionDir: string;
  track: string;
  mode: string;
  providerName?: string;
}

export interface EvaluateAnswerResult {
  scorecard: string;
  feedback: string;
  improvedAnswer: string;
}

export async function evaluateAnswer(options: EvaluateAnswerOptions): Promise<EvaluateAnswerResult> {
  const { answer, sessionDir, track, mode, providerName } = options;

  const config = loadConfig();
  const provider = getProvider(providerName ?? config.model.provider);

  const rubricContent = loadRubricForMode(mode, track);

  // Load questions from session if available
  const questionsPath = path.join(sessionDir, 'questions.md');
  const question = fileExists(questionsPath)
    ? readFile(questionsPath).split('\n').find((l) => l.match(/^\d+\./)) ?? 'Interview question'
    : 'Interview question';

  const prompt = buildAnswerEvalPrompt(question, answer, rubricContent, track, mode);
  const response = await provider.generateCompletion(prompt);

  // Parse the response into sections
  const content = response.content;
  const scorecardSection = extractSection(content, 'Scorecard', 'Feedback') ?? content;
  const feedbackSection = extractSection(content, 'Feedback', 'Improved Answer') ?? content;
  const improvedSection = extractSection(content, 'Improved Answer') ?? content;

  return {
    scorecard: `# Answer Scorecard\n\n**Track**: ${track}\n**Mode**: ${mode}\n\n---\n\n${scorecardSection}`,
    feedback: `# Answer Feedback\n\n**Track**: ${track}\n**Mode**: ${mode}\n\n---\n\n${feedbackSection}`,
    improvedAnswer: `# Improved Answer\n\n**Track**: ${track}\n**Mode**: ${mode}\n\n---\n\n${improvedSection}`,
  };
}

function extractSection(content: string, startHeading: string, endHeading?: string): string | undefined {
  const lines = content.split('\n');
  const startIdx = lines.findIndex((l) => l.toLowerCase().includes(startHeading.toLowerCase()));
  if (startIdx === -1) return undefined;

  const endIdx = endHeading
    ? lines.findIndex((l, i) => i > startIdx && l.toLowerCase().includes(endHeading.toLowerCase()))
    : -1;

  const sectionLines = endIdx === -1 ? lines.slice(startIdx) : lines.slice(startIdx, endIdx);
  return sectionLines.join('\n').trim();
}
