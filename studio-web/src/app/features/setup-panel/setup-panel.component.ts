import { Component, OnInit } from '@angular/core';
import { SessionStateService } from '../../services/session-state.service';
import { StudioApiService } from '../../services/studio-api.service';
import { EthicsNoticeComponent } from '../../shared/ethics-notice/ethics-notice.component';
import { Track, Mode, Provider } from '../../core/models/studio.models';

const BLOCKED_MODES = [
  'live interview',
  'stealth',
  'overlay',
  'hidden',
  'real-time answer',
  'cheat',
  'screen share bypass',
];

@Component({
  selector: 'app-setup-panel',
  standalone: true,
  imports: [EthicsNoticeComponent],
  template: `
    <div class="setup">
      <div class="setup-inner">
        <h1 class="setup-title">Start a New Interview</h1>
        <p class="setup-subtitle">Choose your track, mode, and provider to begin practicing.</p>

        <section class="setup-section">
          <h2 class="section-label">Track</h2>
          <div class="card-grid">
            @for (track of tracks; track track.id) {
              <button
                class="option-card"
                [class.selected]="sessionState.selectedTrack() === track.id"
                (click)="sessionState.selectedTrack.set(track.id)"
              >
                <span class="card-icon">{{ track.icon }}</span>
                <span class="card-name">{{ track.name }}</span>
              </button>
            }
          </div>
        </section>

        <section class="setup-section">
          <h2 class="section-label">Mode</h2>
          <div class="card-grid">
            @for (mode of modes; track mode.id) {
              <button
                class="option-card"
                [class.selected]="sessionState.selectedMode() === mode.id"
                (click)="selectMode(mode.id)"
              >
                <span class="card-icon">{{ mode.icon }}</span>
                <span class="card-name">{{ mode.name }}</span>
              </button>
            }
          </div>
        </section>

        <section class="setup-section">
          <h2 class="section-label">Provider</h2>
          <div class="provider-row">
            @for (provider of providers; track provider.id) {
              <button
                class="provider-btn"
                [class.selected]="sessionState.selectedProvider() === provider.id"
                (click)="sessionState.selectedProvider.set(provider.id)"
              >
                {{ provider.name }}
                @if (provider.requiresKey) {
                  <span class="key-badge">Key required</span>
                }
              </button>
            }
          </div>
        </section>

        <app-ethics-notice />

        @if (error) {
          <div class="error-msg">{{ error }}</div>
        }

        <button
          class="start-btn"
          [disabled]="!canStart() || sessionState.isLoading()"
          (click)="start()"
        >
          @if (sessionState.isLoading()) {
            Starting...
          } @else {
            Start Interview
          }
        </button>
      </div>
    </div>
  `,
  styleUrl: './setup-panel.component.css',
})
export class SetupPanelComponent implements OnInit {
  tracks: Track[] = [];
  modes: Mode[] = [];
  providers: Provider[] = [];
  error: string | null = null;

  constructor(
    public sessionState: SessionStateService,
    private api: StudioApiService
  ) {}

  ngOnInit(): void {
    this.api.getTracks().subscribe((t) => (this.tracks = t));
    this.api.getModes().subscribe((m) => (this.modes = m));
    this.api.getProviders().subscribe((p) => (this.providers = p));
  }

  selectMode(modeId: string): void {
    const isBlocked = BLOCKED_MODES.some((b) =>
      modeId.toLowerCase().includes(b)
    );
    if (isBlocked) {
      this.error =
        'This mode is blocked for ethical reasons. InterviewOps is for practice only.';
      return;
    }
    this.error = null;
    this.sessionState.selectedMode.set(modeId);
  }

  canStart(): boolean {
    return (
      this.sessionState.selectedTrack() !== '' &&
      this.sessionState.selectedMode() !== '' &&
      this.sessionState.selectedProvider() !== ''
    );
  }

  start(): void {
    this.sessionState.createSession(
      this.sessionState.selectedTrack(),
      this.sessionState.selectedMode(),
      this.sessionState.selectedProvider()
    );
  }
}
