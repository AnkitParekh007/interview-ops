import { Component, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { DashboardSummary } from '../../core/models/studio.models';
import { StudioApiService } from '../../services/studio-api.service';

@Component({
  selector: 'app-progress-dashboard',
  standalone: true,
  template: `
    <div class="dash-page">
      <div class="dash-container">
        <div class="dash-header">
          <div>
            <h1 class="dash-title">Progress Dashboard</h1>
            <p class="dash-subtitle">Track your interview preparation progress.</p>
          </div>
          <button class="back-btn" (click)="goBack()">Back to Studio</button>
        </div>

        @if (summary()) {
          <div class="stats-grid">
            <div class="stat-card">
              <span class="stat-number">{{ summary()!.totalSessions }}</span>
              <span class="stat-label">Total Sessions</span>
            </div>
            <div class="stat-card">
              <span class="stat-number">{{ summary()!.averageReadinessScore }}</span>
              <span class="stat-label">Avg. Score</span>
            </div>
            <div class="stat-card">
              <span class="stat-number mode-text">{{ summary()!.mostPracticedMode || '--' }}</span>
              <span class="stat-label">Most Practiced Mode</span>
            </div>
            <div class="stat-card">
              <span class="stat-number mode-text">{{ summary()!.mostPracticedTrack || '--' }}</span>
              <span class="stat-label">Most Practiced Track</span>
            </div>
          </div>

          <div class="dash-row">
            <div class="dash-section">
              <h3 class="section-label">Strongest Areas</h3>
              <div class="pills">
                @for (area of summary()!.strongestAreas; track area) {
                  <span class="pill pill-green">{{ area }}</span>
                }
              </div>
            </div>

            <div class="dash-section">
              <h3 class="section-label">Weakest Areas</h3>
              <div class="pills">
                @for (area of summary()!.weakestAreas; track area) {
                  <span class="pill pill-red">{{ area }}</span>
                }
              </div>
            </div>
          </div>

          <div class="dash-section">
            <h3 class="section-label">Recommended Next</h3>
            <div class="recommendation">
              <span class="rec-mode">{{ summary()!.recommendedNextMode }}</span>
              <span class="rec-label">Practice this mode next to build well-rounded preparation.</span>
            </div>
          </div>

          <div class="dash-section">
            <h3 class="section-label">Recent Sessions</h3>
            @if (summary()!.recentSessions.length === 0) {
              <p class="empty-text">No sessions yet. Start your first practice session!</p>
            }
            <div class="sessions-list">
              @for (session of summary()!.recentSessions; track session.id) {
                <div class="session-row">
                  <div class="session-info">
                    <span class="session-mode">{{ session.mode }}</span>
                    <span class="session-track">{{ session.track }}</span>
                  </div>
                  <div class="session-meta">
                    <span class="session-status" [class]="'status-' + session.status">{{ session.status }}</span>
                    <span class="session-date">{{ formatDate(session.createdAt) }}</span>
                  </div>
                </div>
              }
            </div>
          </div>

          <div class="dash-section">
            <h3 class="section-label">Sessions by Mode</h3>
            <div class="mode-bars">
              @for (entry of modeEntries(); track entry[0]) {
                <div class="mode-bar-row">
                  <span class="mode-name">{{ entry[0] }}</span>
                  <div class="mode-bar">
                    <div class="mode-fill" [style.width.%]="getBarWidth(entry[1])"></div>
                  </div>
                  <span class="mode-count">{{ entry[1] }}</span>
                </div>
              }
            </div>
          </div>
        }
      </div>
    </div>
  `,
  styleUrl: './progress-dashboard.component.css',
})
export class ProgressDashboardComponent implements OnInit {
  summary = signal<DashboardSummary | null>(null);
  modeEntries = signal<[string, number][]>([]);

  constructor(
    private api: StudioApiService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.api.getDashboardSummary().subscribe({
      next: (data) => {
        this.summary.set(data);
        this.modeEntries.set(
          Object.entries(data.sessionsByMode).sort((a, b) => b[1] - a[1])
        );
      },
    });
  }

  getBarWidth(count: number): number {
    const max = Math.max(...this.modeEntries().map((e) => e[1]), 1);
    return (count / max) * 100;
  }

  formatDate(iso: string): string {
    return new Date(iso).toLocaleDateString();
  }

  goBack(): void {
    this.router.navigate(['/']);
  }
}
