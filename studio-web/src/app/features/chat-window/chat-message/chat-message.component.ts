import { Component, Input } from '@angular/core';
import { InterviewMessage } from '../../../core/models/studio.models';

@Component({
  selector: 'app-chat-message',
  standalone: true,
  template: `
    <div class="message" [class]="'message--' + message.role">
      @if (message.role === 'system') {
        <div class="system-pill">{{ message.content }}</div>
      }
      @if (message.role === 'interviewer') {
        <div class="bubble interviewer-bubble">
          <div class="bubble-avatar">&#x1F9D1;&#x200D;&#x1F4BC;</div>
          <div class="bubble-content">
            <div class="bubble-role">Interviewer</div>
            <div class="bubble-text">{{ message.content }}</div>
          </div>
        </div>
      }
      @if (message.role === 'candidate') {
        <div class="bubble candidate-bubble">
          <div class="bubble-content">
            <div class="bubble-role">You</div>
            <div class="bubble-text">{{ message.content }}</div>
          </div>
        </div>
      }
      @if (message.role === 'coach') {
        <div class="coach-box">
          <span class="coach-icon">&#x1F4A1;</span>
          <div class="coach-content">
            <div class="coach-label">Coach Tip</div>
            <div class="coach-text">{{ message.content }}</div>
          </div>
        </div>
      }
    </div>
  `,
  styleUrl: './chat-message.component.css',
})
export class ChatMessageComponent {
  @Input({ required: true }) message!: InterviewMessage;
}
