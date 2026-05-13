import { Component, Input } from '@angular/core';
import { StudyPlan } from '../../core/models/studio.models';

@Component({
  selector: 'app-study-plan-panel',
  standalone: true,
  template: `
    <div class="study-plan">
      <h2 class="plan-title">Study Plan</h2>

      <section class="plan-section">
        <h3 class="plan-subtitle">7-Day Plan</h3>
        <ol class="plan-list">
          @for (item of studyPlan.sevenDayPlan; track item) {
            <li class="plan-item">{{ item }}</li>
          }
        </ol>
      </section>

      <section class="plan-section">
        <h3 class="plan-subtitle">14-Day Plan</h3>
        <ol class="plan-list">
          @for (item of studyPlan.fourteenDayPlan; track item) {
            <li class="plan-item">{{ item }}</li>
          }
        </ol>
      </section>
    </div>
  `,
  styleUrl: './study-plan-panel.component.css',
})
export class StudyPlanPanelComponent {
  @Input({ required: true }) studyPlan!: StudyPlan;
}
