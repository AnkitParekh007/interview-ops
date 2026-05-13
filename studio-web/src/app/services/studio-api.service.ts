import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  InterviewSession,
  Track,
  Mode,
  Provider,
} from '../core/models/studio.models';

@Injectable({ providedIn: 'root' })
export class StudioApiService {
  private readonly base = 'http://localhost:4317/api';

  constructor(private http: HttpClient) {}

  getHealth(): Observable<{ status: string; version: string; timestamp: string }> {
    return this.http.get<{ status: string; version: string; timestamp: string }>(
      `${this.base}/health`
    );
  }

  getTracks(): Observable<Track[]> {
    return this.http.get<Track[]>(`${this.base}/tracks`);
  }

  getModes(): Observable<Mode[]> {
    return this.http.get<Mode[]>(`${this.base}/modes`);
  }

  getProviders(): Observable<Provider[]> {
    return this.http.get<Provider[]>(`${this.base}/providers`);
  }

  getSessions(): Observable<InterviewSession[]> {
    return this.http.get<InterviewSession[]>(`${this.base}/sessions`);
  }

  createSession(payload: {
    track: string;
    mode: string;
    provider: string;
  }): Observable<InterviewSession> {
    return this.http.post<InterviewSession>(`${this.base}/sessions`, payload);
  }

  getSession(id: string): Observable<InterviewSession> {
    return this.http.get<InterviewSession>(`${this.base}/sessions/${id}`);
  }

  sendMessage(sessionId: string, content: string): Observable<InterviewSession> {
    return this.http.post<InterviewSession>(
      `${this.base}/sessions/${sessionId}/messages`,
      { content }
    );
  }

  finishSession(sessionId: string): Observable<InterviewSession> {
    return this.http.post<InterviewSession>(
      `${this.base}/sessions/${sessionId}/finish`,
      {}
    );
  }
}
