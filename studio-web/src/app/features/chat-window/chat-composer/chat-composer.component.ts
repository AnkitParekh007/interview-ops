import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-chat-composer',
  standalone: true,
  imports: [FormsModule],
  template: `
    <div class="composer">
      <textarea
        class="composer-input"
        [(ngModel)]="content"
        placeholder="Type your answer..."
        [disabled]="disabled"
        (keydown)="onKeydown($event)"
        rows="3"
      ></textarea>
      <button
        class="send-btn"
        [disabled]="disabled || !content.trim()"
        (click)="send()"
      >
        Send
      </button>
    </div>
  `,
  styleUrl: './chat-composer.component.css',
})
export class ChatComposerComponent {
  @Input() disabled = false;
  @Output() messageSent = new EventEmitter<string>();

  content = '';

  onKeydown(event: KeyboardEvent): void {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      this.send();
    }
  }

  send(): void {
    const text = this.content.trim();
    if (text) {
      this.messageSent.emit(text);
      this.content = '';
    }
  }
}
