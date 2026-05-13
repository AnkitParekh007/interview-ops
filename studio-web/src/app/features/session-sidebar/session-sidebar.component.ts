import { Component } from '@angular/core';
import { DatePipe } from '@angular/common';
import { SessionStateService } from '../../services/session-state.service';

@Component({
  selector: 'app-session-sidebar',
  standalone: true,
  imports: [DatePipe],
  template: `
    <aside class="sidebar">
      <button class="new-btn" (click)="sessionState.clearSession()">
        + New Interview
      </button>
      <div class="session-list">
        @for (session of sessionState.sessions(); track session.id) {
          <button
            class="session-item"
            [class.active]="sessionState.activeSession()?.id === session.id"
            (click)="sessionState.loadSession(session.id)"
          >
            <div class="session-track">{{ session.track }}</div>
            <div class="session-meta">
              <span class="session-mode">{{ session.mode }}</span>
              <span
                class="session-status"
                [class.finished]="session.status === 'finished'"
                [class.active-status]="session.status === 'active'"
              >
                {{ session.status }}
              </span>
            </div>
            <div class="session-date">{{ session.createdAt | date: 'short' }}</div>
          </button>
        }
        @if (sessionState.sessions().length === 0) {
          <div class="empty-state">No sessions yet. Start a new interview!</div>
        }
      </div>
    </aside>
  `,
  styleUrl: './session-sidebar.component.css',
})
export class SessionSidebarComponent {
  constructor(public sessionState: SessionStateService) {}
}
