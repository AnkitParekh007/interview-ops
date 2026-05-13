import { Component, Input } from '@angular/core';
import { ReadinessReport } from '../../core/models/studio.models';
import { StudioApiService } from '../../services/studio-api.service';

@Component({
  selector: 'app-readiness-report-panel',
  standalone: true,
  template: `
    <div class="report">
      <h2 class="report-title">Readiness Report</h2>

      <div class="report-header">
        <div class="score-circle">
          <span class="score-number">{{ report.readinessScore }}</span>
          <span class="score-label">/ 100</span>
        </div>
        <div class="signal-container">
          <span class="hire-signal" [class]="getSignalClass()">{{ report.hireSignal }}</span>
          <p class="summary">{{ report.summary }}</p>
        </div>
      </div>

      <div class="report-grid">
        <div class="report-section">
          <h3 class="section-label">Strengths</h3>
          <ul class="list strengths-list">
            @for (s of report.strengths; track s) {
              <li class="list-item strength">{{ s }}</li>
            }
          </ul>
        </div>

        <div class="report-section">
          <h3 class="section-label">Weaknesses</h3>
          <ul class="list weaknesses-list">
            @for (w of report.weaknesses; track w) {
              <li class="list-item weakness">{{ w }}</li>
            }
          </ul>
        </div>
      </div>

      <div class="report-section">
        <h3 class="section-label">Top 5 Actions</h3>
        <ol class="actions-list">
          @for (action of report.topActions; track action; let i = $index) {
            <li class="action-item">{{ action }}</li>
          }
        </ol>
      </div>

      <div class="report-section">
        <h3 class="section-label">Weakness Map</h3>
        <div class="weakness-map">
          @for (item of report.weaknessMap; track item.area) {
            <div class="weakness-card" [class]="'severity-' + item.severity">
              <div class="weakness-card-header">
                <span class="weakness-area">{{ item.area }}</span>
                <span class="severity-badge" [class]="'badge-' + item.severity">{{ item.severity }}</span>
              </div>
              <p class="weakness-evidence">{{ item.evidence }}</p>
              <p class="weakness-rec">{{ item.recommendation }}</p>
            </div>
          }
        </div>
      </div>

      <div class="report-section">
        <h3 class="section-label">30-Day Plan</h3>
        <div class="plan-tabs">
          <div class="plan-phase">
            <h4 class="phase-label">Week 1</h4>
            @for (item of report.sevenDayPlan; track item) {
              <div class="plan-item">{{ item }}</div>
            }
          </div>
          <div class="plan-phase">
            <h4 class="phase-label">Week 2</h4>
            @for (item of report.fourteenDayPlan; track item) {
              <div class="plan-item">{{ item }}</div>
            }
          </div>
          <div class="plan-phase">
            <h4 class="phase-label">Month</h4>
            @for (item of report.thirtyDayPlan; track item) {
              <div class="plan-item">{{ item }}</div>
            }
          </div>
        </div>
      </div>

      <div class="export-actions">
        <button class="export-btn" (click)="exportMarkdown()">Export as Markdown</button>
        <button class="export-btn" (click)="exportHtml()">Export as HTML (print)</button>
      </div>
    </div>
  `,
  styleUrl: './readiness-report-panel.component.css',
})
export class ReadinessReportPanelComponent {
  @Input({ required: true }) report!: ReadinessReport;

  constructor(private api: StudioApiService) {}

  getSignalClass(): string {
    const signal = this.report.hireSignal;
    if (signal.includes('No')) return 'hire-signal signal-negative';
    if (signal === 'Lean Hire') return 'hire-signal signal-neutral';
    return 'hire-signal signal-positive';
  }

  exportMarkdown(): void {
    this.api.exportMarkdown(this.report.sessionId).subscribe({
      next: (md) => this.download(md, `session-${this.report.sessionId}.md`, 'text/markdown'),
    });
  }

  exportHtml(): void {
    this.api.exportHtml(this.report.sessionId).subscribe({
      next: (html) => this.download(html, `session-${this.report.sessionId}.html`, 'text/html'),
    });
  }

  private download(content: string, filename: string, type: string): void {
    const blob = new Blob([content], { type });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  }
}
