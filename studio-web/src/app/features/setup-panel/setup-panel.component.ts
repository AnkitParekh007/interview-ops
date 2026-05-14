import { Component, OnInit, signal, computed } from '@angular/core';
import { FormsModule } from '@angular/forms';
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
  imports: [EthicsNoticeComponent, FormsModule],
  template: `
    <div class="setup">
      <div class="setup-inner">
        <h1 class="setup-title">Start a New Interview</h1>
        <p class="setup-subtitle">Choose your track, mode, and AI provider to begin practicing.</p>

        <!-- ── Track ── -->
        <section class="setup-section">
          <div class="section-header">
            <h2 class="section-label">Track</h2>
            <span class="track-count">{{ filteredTracks().length }} / {{ tracks.length }}</span>
          </div>
          <div class="track-search-wrap">
            <span class="track-search-icon">🔍</span>
            <input
              class="track-search"
              type="text"
              placeholder="Filter roles… e.g. frontend, python, cloud"
              [(ngModel)]="trackFilter"
            />
            @if (trackFilter) {
              <button class="track-search-clear" (click)="trackFilter = ''" title="Clear">✕</button>
            }
          </div>
          <div class="card-scroll">
            <div class="card-grid">
              @for (track of filteredTracks(); track track.id) {
                <button
                  class="option-card"
                  [class.selected]="sessionState.selectedTrack() === track.id"
                  (click)="sessionState.selectedTrack.set(track.id)"
                >
                  <span class="card-icon">{{ track.icon }}</span>
                  <span class="card-name">{{ track.name }}</span>
                </button>
              }
              @if (filteredTracks().length === 0) {
                <p class="track-empty">No tracks match "{{ trackFilter }}"</p>
              }
            </div>
          </div>
        </section>

        <!-- ── Mode ── -->
        <section class="setup-section">
          <div class="section-header">
            <h2 class="section-label">Mode</h2>
            <span class="track-count">{{ filteredModes().length }} / {{ modes.length }}</span>
          </div>
          <div class="track-search-wrap">
            <span class="track-search-icon">🔍</span>
            <input
              class="track-search"
              type="text"
              placeholder="Filter modes… e.g. system design, behavioral, coding"
              [(ngModel)]="modeFilter"
            />
            @if (modeFilter) {
              <button class="track-search-clear" (click)="modeFilter = ''" title="Clear">✕</button>
            }
          </div>
          <div class="card-scroll">
            <div class="card-grid">
              @for (mode of filteredModes(); track mode.id) {
                <button
                  class="option-card"
                  [class.selected]="sessionState.selectedMode() === mode.id"
                  (click)="selectMode(mode.id)"
                >
                  <span class="card-icon">{{ mode.icon }}</span>
                  <span class="card-name">{{ mode.name }}</span>
                </button>
              }
              @if (filteredModes().length === 0) {
                <p class="track-empty">No modes match "{{ modeFilter }}"</p>
              }
            </div>
          </div>
        </section>

        <!-- ── Provider ── -->
        <section class="setup-section">
          <h2 class="section-label">AI Provider</h2>
          <div class="provider-scroll">
          <div class="provider-grid">
            @for (provider of providers; track provider.id) {
              <button
                class="provider-card"
                [class.selected]="sessionState.selectedProvider() === provider.id"
                (click)="selectProvider(provider)"
              >
                <div class="provider-top">
                  <span class="provider-icon">{{ provider.icon }}</span>
                  @if (provider.badge) {
                    <span class="provider-badge" [class.badge-free]="provider.badge === 'Free' || provider.badge === 'Local'">
                      {{ provider.badge }}
                    </span>
                  }
                </div>
                <span class="provider-name">{{ provider.name }}</span>
                <span class="provider-desc">{{ provider.description }}</span>
                @if (provider.requiresKey) {
                  <span class="key-tag">🔑 Key required</span>
                } @else {
                  <span class="key-tag free-tag">✓ No key needed</span>
                }
              </button>
            }
          </div>
          </div>

          <!-- ── Provider detail panel ── -->
          @if (activeProvider()) {
            <div class="provider-detail" [class.detail-visible]="activeProvider() !== null">

              <!-- Model selector -->
              @if (activeProvider()!.models.length) {
                <div class="detail-row">
                  <label class="detail-label">Model</label>
                  <div class="model-grid">
                    @for (model of activeProvider()!.models; track model.id) {
                      <button
                        class="model-btn"
                        [class.selected]="sessionState.selectedModel() === model.id"
                        (click)="sessionState.selectedModel.set(model.id)"
                      >
                        {{ model.name }}
                        @if (model.recommended) {
                          <span class="model-rec">★ Recommended</span>
                        }
                      </button>
                    }
                  </div>
                </div>
              }

              <!-- Setup instructions (only for providers that need setup) -->
              @if (activeProvider()!.setupSteps.length > 0) {
                <div class="detail-row">
                  <button class="setup-toggle" (click)="showSetup.set(!showSetup())">
                    <span class="setup-toggle-icon">{{ showSetup() ? '▾' : '▸' }}</span>
                    @if (activeProvider()!.requiresKey) {
                      How to get your <strong>{{ activeProvider()!.keyEnvVar }}</strong>
                    } @else {
                      How to set up <strong>{{ activeProvider()!.name }}</strong>
                    }
                  </button>

                  @if (showSetup()) {
                    <div class="setup-instructions">
                      <ol class="setup-steps">
                        @for (step of activeProvider()!.setupSteps; track $index) {
                          <li class="setup-step">{{ step }}</li>
                        }
                      </ol>
                      @if (activeProvider()!.docsUrl) {
                        <a
                          class="docs-link"
                          [href]="activeProvider()!.docsUrl"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Open {{ activeProvider()!.name }} console →
                        </a>
                      }
                    </div>
                  }
                </div>
              }

              <!-- Ollama: show local server status hint -->
              @if (activeProvider()!.id === 'ollama') {
                <div class="ollama-hint">
                  <span class="hint-dot"></span>
                  Ollama connects to <code>localhost:11434</code> — make sure it's running before starting.
                </div>
              }
            </div>
          }
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
  trackFilter = '';
  modeFilter = '';

  readonly activeProvider = signal<Provider | null>(null);
  readonly showSetup = signal(false);

  filteredModes(): Mode[] {
    const q = this.modeFilter.trim().toLowerCase();
    if (!q) return this.modes;
    return this.modes.filter(
      (m) =>
        m.name.toLowerCase().includes(q) ||
        m.id.toLowerCase().includes(q) ||
        m.description.toLowerCase().includes(q)
    );
  }

  filteredTracks(): Track[] {
    const q = this.trackFilter.trim().toLowerCase();
    if (!q) return this.tracks;
    return this.tracks.filter(
      (t) =>
        t.name.toLowerCase().includes(q) ||
        t.id.toLowerCase().includes(q) ||
        t.description.toLowerCase().includes(q)
    );
  }

  constructor(
    public sessionState: SessionStateService,
    private api: StudioApiService
  ) {}

  ngOnInit(): void {
    this.api.getTracks().subscribe((t) => (this.tracks = t));
    this.api.getModes().subscribe((m) => (this.modes = m));
    this.api.getProviders().subscribe((p) => {
      this.providers = p;
      // Pre-select the default provider (mock)
      const defaultProvider = p.find((x) => x.id === 'mock') ?? p[0];
      if (defaultProvider) {
        this.selectProvider(defaultProvider);
      }
    });
  }

  selectProvider(provider: Provider): void {
    this.sessionState.selectedProvider.set(provider.id);
    this.activeProvider.set(provider);
    this.showSetup.set(false);

    // Auto-select recommended model (or first model)
    const recommended = provider.models?.find((m) => m.recommended) ?? provider.models?.[0];
    this.sessionState.selectedModel.set(recommended?.id ?? '');
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
      this.sessionState.selectedProvider(),
      this.sessionState.selectedModel() || undefined
    );
  }
}
