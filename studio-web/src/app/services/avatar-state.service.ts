import { Injectable, signal } from '@angular/core';
import { AvatarState } from '../core/models/studio.models';

@Injectable({ providedIn: 'root' })
export class AvatarStateService {
  readonly state = signal<AvatarState>('idle');
  readonly tip = signal<string>('Select a track and mode to begin your practice session.');

  setState(state: AvatarState): void {
    this.state.set(state);
    this.tip.set(this.getTipForState(state));
  }

  private getTipForState(state: AvatarState): string {
    switch (state) {
      case 'idle':
        return 'Select a track and mode to begin your practice session.';
      case 'greeting':
        return 'Welcome! I will be your AI interviewer today.';
      case 'listening':
        return 'Take your time. Structure your answer clearly.';
      case 'thinking':
        return 'Analyzing your response...';
      case 'speaking':
        return 'Listen carefully to the question and any feedback.';
      case 'encouraging':
        return 'Great work! Keep building on that.';
      case 'challenging':
        return 'Push yourself to go deeper with specifics.';
      case 'scoring':
        return 'Calculating your performance...';
      case 'celebrating':
        return 'Interview complete! Review your scorecard below.';
      default:
        return '';
    }
  }
}
