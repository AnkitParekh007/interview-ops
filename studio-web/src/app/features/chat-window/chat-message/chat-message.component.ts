import { Component, Input } from '@angular/core';
import { InterviewMessage } from '../../../core/models/studio.models';

@Component({
  selector: 'app-chat-message',
  standalone: true,
  template: `
    @if (message.role === 'system') {
      <div class="system-pill">{{ message.content }}</div>
    }

    @if (message.role === 'interviewer') {
      <div class="row row--ai">
        <div class="ai-avatar">🎯</div>
        <div class="ai-body">
          <span class="role-label">Interviewer</span>
          <div class="ai-text">{{ message.content }}</div>
        </div>
      </div>
    }

    @if (message.role === 'candidate') {
      <div class="row row--user">
        <div class="user-bubble">{{ message.content }}</div>
      </div>
    }

    @if (message.role === 'coach') {
      <div class="coach-row">
        <span class="coach-icon">💡</span>
        <div class="coach-body">
          <span class="coach-label">Coach</span>
          <div class="coach-text">{{ message.content }}</div>
        </div>
      </div>
    }
  `,
  styleUrl: './chat-message.component.css',
})
export class ChatMessageComponent {
  @Input({ required: true }) message!: InterviewMessage;
}
