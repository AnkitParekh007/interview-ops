import { Component, OnInit } from '@angular/core';
import { SessionStateService } from '../../services/session-state.service';
import { AvatarStateService } from '../../services/avatar-state.service';
import { SessionSidebarComponent } from '../session-sidebar/session-sidebar.component';
import { SetupPanelComponent } from '../setup-panel/setup-panel.component';
import { ChatWindowComponent } from '../chat-window/chat-window.component';
import { AvatarCoachComponent } from '../avatar-coach/avatar-coach.component';
import { ScorecardPanelComponent } from '../scorecard-panel/scorecard-panel.component';
import { StudyPlanPanelComponent } from '../study-plan-panel/study-plan-panel.component';

@Component({
  selector: 'app-studio-shell',
  standalone: true,
  imports: [
    SessionSidebarComponent,
    SetupPanelComponent,
    ChatWindowComponent,
    AvatarCoachComponent,
    ScorecardPanelComponent,
    StudyPlanPanelComponent,
  ],
  template: `
    <div class="shell">
      <header class="shell-header">
        <div class="logo">
          <span class="logo-icon">&#x1F3AF;</span>
          <span class="logo-text">InterviewOps Studio</span>
        </div>
        <div class="header-badge">Practice-only mode</div>
      </header>
      <div class="shell-body">
        <app-session-sidebar />
        <main class="main-content">
          @if (sessionState.view() === 'setup') {
            <app-setup-panel />
          }
          @if (sessionState.view() === 'chat' || sessionState.view() === 'results') {
            <app-chat-window />
            @if (sessionState.view() === 'results' && sessionState.activeSession()?.scorecard) {
              <app-scorecard-panel [scorecard]="sessionState.activeSession()!.scorecard!" />
            }
            @if (sessionState.view() === 'results' && sessionState.activeSession()?.studyPlan) {
              <app-study-plan-panel [studyPlan]="sessionState.activeSession()!.studyPlan!" />
            }
          }
        </main>
        <app-avatar-coach class="avatar-panel" />
      </div>
    </div>
  `,
  styleUrl: './studio-shell.component.css',
})
export class StudioShellComponent implements OnInit {
  constructor(
    public sessionState: SessionStateService,
    public avatarState: AvatarStateService
  ) {}

  ngOnInit(): void {
    this.sessionState.loadSessions();
  }
}
