import {
  Component, ElementRef, ViewChild,
  AfterViewChecked, HostListener, signal
} from '@angular/core';
import { SessionStateService } from '../../services/session-state.service';
import { ChatMessageComponent } from './chat-message/chat-message.component';
import { ChatComposerComponent } from './chat-composer/chat-composer.component';

@Component({
  selector: 'app-chat-window',
  standalone: true,
  imports: [ChatMessageComponent, ChatComposerComponent],
  template: `
    <div class="chat">

      <!-- Header -->
      <div class="chat-header">
        <div class="chat-meta">
          <span class="chat-track">{{ sessionState.activeSession()?.track }}</span>
          <span class="meta-sep">/</span>
          <span class="chat-mode">{{ sessionState.activeSession()?.mode }}</span>
          @if (sessionState.activeSession()?.model) {
            <span class="meta-sep">·</span>
            <span class="chat-model">{{ sessionState.activeSession()?.model }}</span>
          }
        </div>
        <div class="header-right">
          <span
            class="status-badge"
            [class.status-badge--done]="sessionState.activeSession()?.status === 'finished'"
          >
            {{ sessionState.activeSession()?.status }}
          </span>
          @if (sessionState.activeSession()?.status === 'active') {
            <button
              class="finish-btn"
              [disabled]="sessionState.isLoading()"
              (click)="sessionState.finishSession()"
            >
              Finish
            </button>
          }
        </div>
      </div>

      <!-- Messages -->
      <div class="chat-messages" #messagesContainer (scroll)="onScroll()">
        <div class="messages-inner">
          @for (msg of (sessionState.activeSession()?.messages ?? []); track msg.id) {
            <app-chat-message [message]="msg" />
          }
          @if (sessionState.isLoading()) {
            <div class="typing-row">
              <div class="typing-avatar">🎯</div>
              <div class="typing-dots">
                <span class="dot"></span>
                <span class="dot"></span>
                <span class="dot"></span>
              </div>
            </div>
          }
          <!-- Bottom anchor -->
          <div #bottomAnchor></div>
        </div>
      </div>

      <!-- Jump to latest button -->
      @if (showJumpBtn()) {
        <button class="jump-btn" (click)="scrollToBottom(true)" title="Jump to latest">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round">
            <polyline points="6 9 12 15 18 9"/>
          </svg>
          Latest
        </button>
      }

      <!-- Composer — always visible -->
      @if (sessionState.activeSession()?.status === 'active') {
        <div class="composer-area">
          <app-chat-composer
            [disabled]="sessionState.isLoading()"
            (messageSent)="onMessageSent($event)"
          />
        </div>
      }
    </div>
  `,
  styleUrl: './chat-window.component.css',
})
export class ChatWindowComponent implements AfterViewChecked {
  @ViewChild('messagesContainer') private container!: ElementRef<HTMLDivElement>;
  @ViewChild('bottomAnchor')      private anchor!: ElementRef<HTMLDivElement>;

  readonly showJumpBtn = signal(false);

  /** True while user is scrolled away from bottom — suppress auto-scroll. */
  private userScrolledUp = false;
  /** Avoid re-triggering on programmatic scroll. */
  private programmaticScroll = false;

  constructor(public sessionState: SessionStateService) {}

  ngAfterViewChecked(): void {
    if (!this.userScrolledUp) {
      this.scrollToBottom(false);
    }
  }

  onScroll(): void {
    if (this.programmaticScroll) return;
    const el = this.container?.nativeElement;
    if (!el) return;
    const distanceFromBottom = el.scrollHeight - el.scrollTop - el.clientHeight;
    this.userScrolledUp = distanceFromBottom > 80;
    this.showJumpBtn.set(this.userScrolledUp);
  }

  scrollToBottom(force = false): void {
    const el = this.container?.nativeElement;
    if (!el) return;
    this.programmaticScroll = true;
    el.scrollTo({ top: el.scrollHeight, behavior: force ? 'smooth' : 'instant' });
    this.userScrolledUp = false;
    this.showJumpBtn.set(false);
    // Clear flag after animation
    setTimeout(() => { this.programmaticScroll = false; }, 400);
  }

  onMessageSent(text: string): void {
    this.userScrolledUp = false;
    this.showJumpBtn.set(false);
    this.sessionState.sendMessage(text);
  }
}
