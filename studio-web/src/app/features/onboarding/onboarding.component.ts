import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { StudioApiService } from '../../services/studio-api.service';

interface GoalOption {
  id: string;
  label: string;
  icon: string;
}

@Component({
  selector: 'app-onboarding',
  standalone: true,
  imports: [FormsModule],
  template: `
    <div class="onboard-page">
      <div class="onboard-container">
        <div class="onboard-logo">InterviewOps Studio</div>
        <h1 class="onboard-title">Welcome to InterviewOps Studio</h1>
        <p class="onboard-subtitle">Your local-first AI interview practice environment.</p>

        @if (step() === 1) {
          <div class="step">
            <h2 class="step-label">Step 1: Choose your goal</h2>
            <div class="goals-grid">
              @for (goal of goals; track goal.id) {
                <button
                  class="goal-card"
                  [class.selected]="selectedGoal() === goal.id"
                  (click)="selectedGoal.set(goal.id)"
                >
                  <span class="goal-icon">{{ goal.icon }}</span>
                  <span class="goal-label">{{ goal.label }}</span>
                </button>
              }
            </div>
            <button class="next-btn" [disabled]="!selectedGoal()" (click)="step.set(2)">Next</button>
          </div>
        }

        @if (step() === 2) {
          <div class="step">
            <h2 class="step-label">Step 2: Add profile (optional)</h2>
            <p class="step-desc">Paste your resume and job description for personalized questions.</p>
            <textarea class="text-area" [(ngModel)]="resumeText" placeholder="Paste resume text here..." rows="6"></textarea>
            <textarea class="text-area" [(ngModel)]="jdText" placeholder="Paste job description here..." rows="4"></textarea>
            <div class="step-actions">
              <button class="skip-btn" (click)="step.set(3)">Skip</button>
              <button class="next-btn" (click)="saveProfile()">Save & Continue</button>
            </div>
          </div>
        }

        @if (step() === 3) {
          <div class="step">
            <h2 class="step-label">Step 3: Start your first session</h2>
            <p class="step-desc">You are all set! Start a practice session now.</p>
            <button class="start-btn" (click)="complete()">Start Practicing</button>
          </div>
        }

        <div class="step-dots">
          @for (s of [1, 2, 3]; track s) {
            <span class="dot" [class.active]="step() === s"></span>
          }
        </div>
      </div>
    </div>
  `,
  styleUrl: './onboarding.component.css',
})
export class OnboardingComponent {
  step = signal(1);
  selectedGoal = signal<string | null>(null);
  resumeText = '';
  jdText = '';

  goals: GoalOption[] = [
    { id: 'frontend', label: 'Frontend Interview Prep', icon: '\uD83C\uDFA8' },
    { id: 'angular', label: 'Angular Interview Prep', icon: '\uD83C\uDD70\uFE0F' },
    { id: 'react', label: 'React Interview Prep', icon: '\u269B\uFE0F' },
    { id: 'ai-eng', label: 'AI Engineer Interview Prep', icon: '\uD83E\uDD16' },
    { id: 'behavioral', label: 'Behavioral Interview Prep', icon: '\uD83D\uDDE3\uFE0F' },
    { id: 'system-design', label: 'System Design Prep', icon: '\uD83C\uDFD7\uFE0F' },
    { id: 'recruiter', label: 'Recruiter Screen Prep', icon: '\uD83D\uDCDE' },
  ];

  constructor(
    private api: StudioApiService,
    private router: Router
  ) {}

  saveProfile(): void {
    if (this.resumeText) {
      this.api.uploadResume(this.resumeText).subscribe();
    }
    if (this.jdText) {
      this.api.uploadJobDescription(this.jdText).subscribe();
    }
    this.step.set(3);
  }

  complete(): void {
    localStorage.setItem('interviewops-onboarded', 'true');
    this.router.navigate(['/']);
  }
}
