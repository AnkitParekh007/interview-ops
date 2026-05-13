import { buildPlanPrompt } from './prompt-builder.js';
import { getProvider } from '../providers/provider-registry.js';
import type { InterviewOpsConfig } from '../config/config.schema.js';

export interface PrepPlanOptions {
  resume: string;
  jobDescription: string;
  config: InterviewOpsConfig;
  providerName?: string;
}

export async function generatePrepPlan(options: PrepPlanOptions): Promise<string> {
  const { resume, jobDescription, config, providerName } = options;

  const provider = getProvider(providerName ?? config.model.provider);
  const prompt = buildPlanPrompt(resume, jobDescription, config);
  const response = await provider.generateCompletion(prompt);

  return response.content;
}
