import { Component, EventEmitter, Input, Output, OnDestroy, ElementRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SpeechService } from '../../../services/speech.service';
import { AvatarStateService } from '../../../services/avatar-state.service';

@Component({
  selector: 'app-chat-composer',
  standalone: true,
  imports: [FormsModule],
  template: `
    <div class="composer-wrap">

      <!-- Speech preview (above the box) -->
      @if (speech.state() === 'listening') {
        <div class="speech-bar">
          <span class="speech-dot"></span>
          <span class="speech-text">{{ speech.interimText() || 'Listening…' }}</span>
        </div>
      }

      @if (speech.state() === 'error') {
        <div class="speech-error">
          Microphone error — please check permissions and try again.
        </div>
      }

      <!-- Main input box -->
      <div class="input-box" [class.input-box--active]="isFocused || speech.state() === 'listening'">
        <textarea
          #ta
          class="input-field"
          [(ngModel)]="content"
          [placeholder]="speech.state() === 'listening' ? 'Speaking…' : 'Message Interviewer…'"
          [disabled]="disabled"
          rows="1"
          (keydown)="onKeydown($event)"
          (input)="autoResize()"
          (focus)="isFocused = true"
          (blur)="isFocused = false"
        ></textarea>

        <!-- Inline action buttons -->
        <div class="input-actions">
          @if (speech.isSupported) {
            <button
              class="action-btn mic-btn"
              [class.mic-btn--on]="speech.state() === 'listening'"
              [disabled]="disabled"
              (click)="toggleMic()"
              [title]="speech.state() === 'listening' ? 'Stop recording' : 'Speak your answer'"
              type="button"
            >
              @if (speech.state() === 'listening') {
                <span class="mic-ring"></span>
              }
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <rect x="9" y="2" width="6" height="12" rx="3"/>
                <path d="M5 10a7 7 0 0 0 14 0"/>
                <line x1="12" y1="17" x2="12" y2="22"/>
                <line x1="8" y1="22" x2="16" y2="22"/>
              </svg>
            </button>
          }

          <button
            class="action-btn send-btn"
            [class.send-btn--ready]="canSend()"
            [disabled]="disabled || !canSend()"
            (click)="send()"
            type="button"
            title="Send (Enter)"
          >
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm3.21 10.71l-4 4a1 1 0 0 1-1.42-1.42L12.59 13H8a1 1 0 0 1 0-2h4.59l-2.8-2.29a1 1 0 1 1 1.42-1.42l4 4a1 1 0 0 1 0 1.42z"/>
            </svg>
          </button>
        </div>
      </div>

      <p class="hint">Enter to send &nbsp;·&nbsp; Shift+Enter for new line</p>
    </div>
  `,
  styleUrl: './chat-composer.component.css',
})
export class ChatComposerComponent implements OnDestroy {
  @Input() disabled = false;
  @Output() messageSent = new EventEmitter<string>();

  @ViewChild('ta') private ta!: ElementRef<HTMLTextAreaElement>;

  content = '';
  isFocused = false;

  constructor(
    public speech: SpeechService,
    private avatarState: AvatarStateService
  ) {}

  ngOnDestroy(): void {
    this.speech.stop();
  }

  autoResize(): void {
    const el = this.ta?.nativeElement;
    if (!el) return;
    el.style.height = 'auto';
    el.style.height = `${Math.min(el.scrollHeight, 180)}px`;
  }

  toggleMic(): void {
    if (this.speech.state() === 'listening') {
      this.speech.stop();
      this.avatarState.setState('speaking');
    } else {
      this.speech.start((final) => {
        const sep = this.content && !this.content.endsWith(' ') ? ' ' : '';
        this.content += sep + final;
        // Trigger resize after content update
        setTimeout(() => this.autoResize(), 0);
      });
      this.avatarState.setState('listening');
    }
  }

  canSend(): boolean {
    return this.content.trim().length > 0;
  }

  onKeydown(event: KeyboardEvent): void {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      this.send();
    }
  }

  send(): void {
    if (this.speech.state() === 'listening') {
      const interim = this.speech.interimText();
      if (interim) {
        const sep = this.content && !this.content.endsWith(' ') ? ' ' : '';
        this.content += sep + interim;
      }
      this.speech.stop();
    }

    const text = this.content.trim();
    if (text) {
      this.messageSent.emit(text);
      this.content = '';
      // Reset textarea height
      setTimeout(() => {
        const el = this.ta?.nativeElement;
        if (el) el.style.height = 'auto';
      }, 0);
    }
  }
}
