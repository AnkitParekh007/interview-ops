import { Component, Input } from '@angular/core';
import { InterviewScorecard } from '../../core/models/studio.models';

@Component({
  selector: 'app-scorecard-panel',
  standalone: true,
  template: `
    <div class="scorecard">
      <h2 class="scorecard-title">Scorecard</h2>
      <div class="scorecard-header">
        <div class="overall-score">
          <span class="score-number">{{ scorecard.overallScore }}</span>
          <span class="score-max">/ {{ scorecard.maxScore }}</span>
        </div>
        <span class="hire-signal" [class]="getSignalClass()">
          {{ scorecard.hireSignal }}
        </span>
      </div>
      <div class="dimensions">
        @for (dim of scorecard.dimensions; track dim.name) {
          <div class="dimension">
            <div class="dim-header">
              <span class="dim-name">{{ dim.name }}</span>
              <span class="dim-score">{{ dim.score }} / 5</span>
            </div>
            <div class="dim-bar">
              <div class="dim-fill" [style.width.%]="(dim.score / 5) * 100"></div>
            </div>
            <p class="dim-feedback">{{ dim.feedback }}</p>
          </div>
        }
      </div>
    </div>
  `,
  styleUrl: './scorecard-panel.component.css',
})
export class ScorecardPanelComponent {
  @Input({ required: true }) scorecard!: InterviewScorecard;

  getSignalClass(): string {
    const map: Record<string, string> = {
      'Strong Hire': 'signal-strong-hire',
      Hire: 'signal-hire',
      'Lean Hire': 'signal-lean-hire',
      'Lean No Hire': 'signal-lean-no',
      'No Hire': 'signal-no',
    };
    return 'hire-signal ' + (map[this.scorecard.hireSignal] ?? '');
  }
}
