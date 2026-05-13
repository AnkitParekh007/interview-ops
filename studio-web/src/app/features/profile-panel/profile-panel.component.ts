import { Component, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CandidateProfile } from '../../core/models/studio.models';
import { StudioApiService } from '../../services/studio-api.service';

@Component({
  selector: 'app-profile-panel',
  standalone: true,
  imports: [FormsModule],
  template: `
    <div class="profile-page">
      <div class="profile-container">
        <div class="profile-header">
          <h1 class="profile-title">Candidate Profile</h1>
          <p class="profile-subtitle">Add your resume and job description to get personalized interview questions.</p>
          <div class="header-actions">
            <button class="back-btn" (click)="goBack()">Back to Studio</button>
          </div>
        </div>

        <section class="profile-section">
          <h2 class="section-label">Resume / Experience</h2>
          <textarea
            class="text-area"
            [(ngModel)]="resumeText"
            placeholder="Paste your resume text here..."
            rows="8"
          ></textarea>
          <div class="char-count">{{ resumeText.length }} characters</div>
        </section>

        <section class="profile-section">
          <h2 class="section-label">Job Description</h2>
          <textarea
            class="text-area"
            [(ngModel)]="jobDescriptionText"
            placeholder="Paste the job description here..."
            rows="8"
          ></textarea>
          <div class="char-count">{{ jobDescriptionText.length }} characters</div>
        </section>

        <div class="form-row">
          <section class="profile-section half">
            <h2 class="section-label">Target Company</h2>
            <input class="text-input" [(ngModel)]="targetCompany" placeholder="e.g., Google" />
          </section>
          <section class="profile-section half">
            <h2 class="section-label">Target Role</h2>
            <input class="text-input" [(ngModel)]="targetRole" placeholder="e.g., Senior Frontend Engineer" />
          </section>
        </div>

        <div class="form-row">
          <section class="profile-section half">
            <h2 class="section-label">Seniority Level</h2>
            <select class="text-input" [(ngModel)]="seniorityLevel">
              <option value="">Select...</option>
              <option value="junior">Junior</option>
              <option value="mid">Mid-Level</option>
              <option value="senior">Senior</option>
              <option value="staff">Staff</option>
              <option value="principal">Principal</option>
            </select>
          </section>
          <section class="profile-section half">
            <h2 class="section-label">Interview Date</h2>
            <input class="text-input" type="date" [(ngModel)]="interviewDate" />
          </section>
        </div>

        <section class="profile-section">
          <h2 class="section-label">Focus Areas</h2>
          <div class="focus-area-chips">
            @for (area of availableAreas; track area) {
              <button
                class="chip"
                [class.selected]="focusAreas.includes(area)"
                (click)="toggleFocusArea(area)"
              >{{ area }}</button>
            }
          </div>
        </section>

        @if (saveMessage()) {
          <div class="save-message" [class.error]="saveMessage()!.startsWith('Error')">{{ saveMessage() }}</div>
        }

        <div class="action-row">
          <button class="save-btn" (click)="save()">Save Profile</button>
          <button class="clear-btn" (click)="clearProfile()">Clear</button>
        </div>
      </div>
    </div>
  `,
  styleUrl: './profile-panel.component.css',
})
export class ProfilePanelComponent implements OnInit {
  resumeText = '';
  jobDescriptionText = '';
  targetCompany = '';
  targetRole = '';
  seniorityLevel = '';
  interviewDate = '';
  focusAreas: string[] = [];
  saveMessage = signal<string | null>(null);

  availableAreas = [
    'Behavioral', 'Coding', 'System Design', 'Frontend Architecture',
    'Angular', 'React', 'Debugging', 'Code Review', 'Recruiter Screen',
  ];

  constructor(
    private api: StudioApiService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.api.getProfile().subscribe({
      next: (profile) => this.loadFromProfile(profile),
    });
  }

  private loadFromProfile(profile: CandidateProfile): void {
    this.resumeText = profile.resumeText ?? '';
    this.jobDescriptionText = profile.jobDescriptionText ?? '';
    this.targetCompany = profile.targetCompany ?? '';
    this.targetRole = profile.targetRole ?? '';
    this.seniorityLevel = profile.seniorityLevel ?? '';
    this.interviewDate = profile.interviewDate ?? '';
    this.focusAreas = profile.focusAreas ?? [];
  }

  toggleFocusArea(area: string): void {
    const idx = this.focusAreas.indexOf(area);
    if (idx >= 0) {
      this.focusAreas = this.focusAreas.filter((a) => a !== area);
    } else {
      this.focusAreas = [...this.focusAreas, area];
    }
  }

  save(): void {
    this.api.updateProfile({
      resumeText: this.resumeText || undefined,
      jobDescriptionText: this.jobDescriptionText || undefined,
      targetCompany: this.targetCompany || undefined,
      targetRole: this.targetRole || undefined,
      seniorityLevel: this.seniorityLevel || undefined,
      interviewDate: this.interviewDate || undefined,
      focusAreas: this.focusAreas,
    }).subscribe({
      next: () => this.saveMessage.set('Profile saved successfully.'),
      error: () => this.saveMessage.set('Error saving profile.'),
    });
  }

  clearProfile(): void {
    this.resumeText = '';
    this.jobDescriptionText = '';
    this.targetCompany = '';
    this.targetRole = '';
    this.seniorityLevel = '';
    this.interviewDate = '';
    this.focusAreas = [];
    this.save();
  }

  goBack(): void {
    this.router.navigate(['/']);
  }
}
