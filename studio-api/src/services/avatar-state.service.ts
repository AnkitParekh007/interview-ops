import type { MessageRole, AvatarState } from '../models/studio.models.js';

export function getAvatarStateForMessage(role: MessageRole): AvatarState {
  switch (role) {
    case 'system':
      return 'greeting';
    case 'interviewer':
      return 'speaking';
    case 'candidate':
      return 'listening';
    case 'coach':
      return 'encouraging';
    default:
      return 'idle';
  }
}
