import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SessionStateService } from '../../services/session-state.service';
import { AvatarStateService } from '../../services/avatar-state.service';
import { ThemeService } from '../../services/theme.service';
import { SessionSidebarComponent } from '../session-sidebar/session-sidebar.component';
import { SetupPanelComponent } from '../setup-panel/setup-panel.component';
import { ChatWindowComponent } from '../chat-window/chat-window.component';
import { AvatarCoachComponent } from '../avatar-coach/avatar-coach.component';
import { ScorecardPanelComponent } from '../scorecard-panel/scorecard-panel.component';
import { StudyPlanPanelComponent } from '../study-plan-panel/study-plan-panel.component';
import { ReadinessReportPanelComponent } from '../readiness-report-panel/readiness-report-panel.component';

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
    ReadinessReportPanelComponent,
  ],
  template: `
    <div class="shell">
      <header class="shell-header">
        <div class="logo">
          <span class="logo-icon">&#x1F3AF;</span>
          <span class="logo-text">InterviewOps Studio</span>
        </div>
        <nav class="header-nav">
          <button class="nav-link" (click)="navigateTo('/dashboard')">Dashboard</button>
          <button class="nav-link" (click)="navigateTo('/star-stories')">STAR Bank</button>
          <button class="nav-link" (click)="navigateTo('/profile')">Profile</button>
          <button class="nav-link" (click)="navigateTo('/pricing')">Pricing</button>
        </nav>
        <div class="header-right">
          <button class="theme-toggle" (click)="theme.toggle()" [title]="theme.theme() === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'">
            @if (theme.theme() === 'dark') { ☀️ } @else { 🌙 }
          </button>
          <div class="header-badge">Practice-only mode</div>
        </div>
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
            @if (sessionState.view() === 'results' && sessionState.readinessReport()) {
              <app-readiness-report-panel [report]="sessionState.readinessReport()!" />
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
    public avatarState: AvatarStateService,
    public theme: ThemeService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.sessionState.loadSessions();

    // Check onboarding
    const onboarded = localStorage.getItem('interviewops-onboarded');
    if (!onboarded) {
      this.router.navigate(['/onboarding']);
    }
  }

  navigateTo(path: string): void {
    this.router.navigate([path]);
  }
}
