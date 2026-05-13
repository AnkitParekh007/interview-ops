import { Component, ElementRef, ViewChild, AfterViewChecked } from '@angular/core';
import { SessionStateService } from '../../services/session-state.service';
import { ChatMessageComponent } from './chat-message/chat-message.component';
import { ChatComposerComponent } from './chat-composer/chat-composer.component';

@Component({
  selector: 'app-chat-window',
  standalone: true,
  imports: [ChatMessageComponent, ChatComposerComponent],
  template: `
    <div class="chat">
      <div class="chat-header">
        <div class="chat-info">
          <span class="chat-track">{{ sessionState.activeSession()?.track }}</span>
          <span class="chat-sep">/</span>
          <span class="chat-mode">{{ sessionState.activeSession()?.mode }}</span>
        </div>
        <span
          class="chat-status"
          [class.finished]="sessionState.activeSession()?.status === 'finished'"
        >
          {{ sessionState.activeSession()?.status }}
        </span>
      </div>
      <div class="chat-messages" #messagesContainer>
        @for (msg of (sessionState.activeSession()?.messages ?? []); track msg.id) {
          <app-chat-message [message]="msg" />
        }
        @if (sessionState.isLoading()) {
          <div class="typing-indicator">
            <span class="dot"></span>
            <span class="dot"></span>
            <span class="dot"></span>
          </div>
        }
      </div>
      @if (sessionState.activeSession()?.status === 'active') {
        <div class="chat-actions">
          <button class="finish-btn" (click)="sessionState.finishSession()">
            Finish Interview
          </button>
        </div>
        <app-chat-composer
          [disabled]="sessionState.isLoading()"
          (messageSent)="sessionState.sendMessage($event)"
        />
      }
    </div>
  `,
  styleUrl: './chat-window.component.css',
})
export class ChatWindowComponent implements AfterViewChecked {
  @ViewChild('messagesContainer') private messagesContainer!: ElementRef<HTMLDivElement>;

  constructor(public sessionState: SessionStateService) {}

  ngAfterViewChecked(): void {
    this.scrollToBottom();
  }

  private scrollToBottom(): void {
    const el = this.messagesContainer?.nativeElement;
    if (el) {
      el.scrollTop = el.scrollHeight;
    }
  }
}
