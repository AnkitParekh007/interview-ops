import path from 'path';
import yaml from 'js-yaml';
import { fileExists, readFile } from '../utils/fs-utils.js';
import { InterviewOpsConfigSchema, type InterviewOpsConfig } from './config.schema.js';
import { ConfigError } from '../utils/errors.js';

const DEFAULT_CONFIG_PATH = 'config/interviewops.yml';

function resolveConfigPath(): string {
  return process.env['INTERVIEWOPS_CONFIG'] ?? DEFAULT_CONFIG_PATH;
}

export function loadConfig(): InterviewOpsConfig {
  const configPath = resolveConfigPath();
  const absolutePath = path.resolve(process.cwd(), configPath);

  if (!fileExists(absolutePath)) {
    // Return defaults if config file not found
    const parsed = InterviewOpsConfigSchema.safeParse({});
    if (parsed.success) {
      return parsed.data;
    }
    throw new ConfigError('Failed to generate default configuration.');
  }

  try {
    const raw = readFile(absolutePath);
    const parsed = yaml.load(raw);
    const result = InterviewOpsConfigSchema.safeParse(parsed);

    if (!result.success) {
      const issues = result.error.issues.map((i) => `  - ${i.path.join('.')}: ${i.message}`).join('\n');
      throw new ConfigError(`Invalid configuration in ${configPath}:\n${issues}`);
    }

    return result.data;
  } catch (err) {
    if (err instanceof ConfigError) throw err;
    throw new ConfigError(`Failed to load config from ${configPath}: ${String(err)}`);
  }
}

export function getOutputDir(config: InterviewOpsConfig): string {
  return process.env['INTERVIEWOPS_OUTPUT_DIR']
    ? path.join(process.env['INTERVIEWOPS_OUTPUT_DIR'], 'sessions')
    : config.project.output_dir;
}
