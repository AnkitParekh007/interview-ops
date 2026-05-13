export class InterviewOpsError extends Error {
  constructor(
    message: string,
    public readonly code?: string,
  ) {
    super(message);
    this.name = 'InterviewOpsError';
  }
}

export class ConfigError extends InterviewOpsError {
  constructor(message: string) {
    super(message, 'CONFIG_ERROR');
    this.name = 'ConfigError';
  }
}

export class ProviderError extends InterviewOpsError {
  constructor(
    message: string,
    public readonly provider?: string,
  ) {
    super(message, 'PROVIDER_ERROR');
    this.name = 'ProviderError';
  }
}

export class TrackNotFoundError extends InterviewOpsError {
  constructor(track: string) {
    super(`Track not found: "${track}". Run 'npm run tracks' to see available tracks.`, 'TRACK_NOT_FOUND');
    this.name = 'TrackNotFoundError';
  }
}

export class ModeNotFoundError extends InterviewOpsError {
  constructor(mode: string) {
    super(`Mode not found: "${mode}". Run 'npm run modes' to see available modes.`, 'MODE_NOT_FOUND');
    this.name = 'ModeNotFoundError';
  }
}
