import { Injectable, signal, computed } from '@angular/core';
import { InterviewSession } from '../core/models/studio.models';
import { StudioApiService } from './studio-api.service';
import { AvatarStateService } from './avatar-state.service';

@Injectable({ providedIn: 'root' })
export class SessionStateService {
  readonly sessions = signal<InterviewSession[]>([]);
  readonly activeSession = signal<InterviewSession | null>(null);
  readonly isLoading = signal(false);
  readonly error = signal<string | null>(null);
  readonly view = signal<'setup' | 'chat' | 'results'>('setup');

  readonly selectedTrack = signal<string>('');
  readonly selectedMode = signal<string>('');
  readonly selectedProvider = signal<string>('mock');

  readonly hasActiveSession = computed(() => this.activeSession() !== null);

  constructor(
    private api: StudioApiService,
    private avatarState: AvatarStateService
  ) {}

  loadSessions(): void {
    this.api.getSessions().subscribe({
      next: (sessions) => this.sessions.set(sessions),
      error: (err) => this.error.set(err.message),
    });
  }

  createSession(track: string, mode: string, provider: string): void {
    this.isLoading.set(true);
    this.error.set(null);
    this.avatarState.setState('greeting');

    this.api.createSession({ track, mode, provider }).subscribe({
      next: (session) => {
        this.activeSession.set(session);
        this.view.set('chat');
        this.isLoading.set(false);
        this.avatarState.setState('speaking');
        this.loadSessions();
      },
      error: (err) => {
        this.error.set(err.message);
        this.isLoading.set(false);
        this.avatarState.setState('idle');
      },
    });
  }

  loadSession(id: string): void {
    this.isLoading.set(true);
    this.api.getSession(id).subscribe({
      next: (session) => {
        this.activeSession.set(session);
        this.view.set(session.status === 'finished' ? 'results' : 'chat');
        this.isLoading.set(false);
        this.avatarState.setState(
          session.status === 'finished' ? 'celebrating' : 'speaking'
        );
      },
      error: (err) => {
        this.error.set(err.message);
        this.isLoading.set(false);
      },
    });
  }

  sendMessage(content: string): void {
    const session = this.activeSession();
    if (!session) return;

    this.isLoading.set(true);
    this.avatarState.setState('thinking');

    this.api.sendMessage(session.id, content).subscribe({
      next: (updated) => {
        this.activeSession.set(updated);
        this.isLoading.set(false);
        this.avatarState.setState('speaking');
      },
      error: (err) => {
        this.error.set(err.message);
        this.isLoading.set(false);
        this.avatarState.setState('listening');
      },
    });
  }

  finishSession(): void {
    const session = this.activeSession();
    if (!session) return;

    this.isLoading.set(true);
    this.avatarState.setState('scoring');

    this.api.finishSession(session.id).subscribe({
      next: (updated) => {
        this.activeSession.set(updated);
        this.view.set('results');
        this.isLoading.set(false);
        this.avatarState.setState('celebrating');
        this.loadSessions();
      },
      error: (err) => {
        this.error.set(err.message);
        this.isLoading.set(false);
      },
    });
  }

  clearSession(): void {
    this.activeSession.set(null);
    this.view.set('setup');
    this.avatarState.setState('idle');
    this.selectedTrack.set('');
    this.selectedMode.set('');
    this.selectedProvider.set('mock');
  }
}
