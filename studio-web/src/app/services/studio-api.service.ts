import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  InterviewSession,
  Track,
  Mode,
  Provider,
  CandidateProfile,
  ReadinessReport,
  StarStory,
  DashboardSummary,
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
    candidateProfileId?: string;
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

  // Profile
  getProfile(): Observable<CandidateProfile> {
    return this.http.get<CandidateProfile>(`${this.base}/profile`);
  }

  updateProfile(profile: Partial<CandidateProfile>): Observable<CandidateProfile> {
    return this.http.put<CandidateProfile>(`${this.base}/profile`, profile);
  }

  uploadResume(text: string): Observable<CandidateProfile> {
    return this.http.post<CandidateProfile>(`${this.base}/profile/resume`, { text });
  }

  uploadJobDescription(text: string): Observable<CandidateProfile> {
    return this.http.post<CandidateProfile>(`${this.base}/profile/jd`, { text });
  }

  // Readiness Report
  generateReadinessReport(sessionId: string): Observable<ReadinessReport> {
    return this.http.post<ReadinessReport>(
      `${this.base}/sessions/${sessionId}/readiness-report`,
      {}
    );
  }

  getReadinessReport(sessionId: string): Observable<ReadinessReport> {
    return this.http.get<ReadinessReport>(
      `${this.base}/sessions/${sessionId}/readiness-report`
    );
  }

  // STAR Stories
  getStarStories(): Observable<StarStory[]> {
    return this.http.get<StarStory[]>(`${this.base}/star-stories`);
  }

  createStarStory(story: Omit<StarStory, 'id' | 'createdAt' | 'updatedAt'>): Observable<StarStory> {
    return this.http.post<StarStory>(`${this.base}/star-stories`, story);
  }

  updateStarStory(id: string, story: Partial<StarStory>): Observable<StarStory> {
    return this.http.put<StarStory>(`${this.base}/star-stories/${id}`, story);
  }

  deleteStarStory(id: string): Observable<void> {
    return this.http.delete<void>(`${this.base}/star-stories/${id}`);
  }

  // Dashboard
  getDashboardSummary(): Observable<DashboardSummary> {
    return this.http.get<DashboardSummary>(`${this.base}/dashboard/summary`);
  }

  // Export
  exportMarkdown(sessionId: string): Observable<string> {
    return this.http.get(`${this.base}/sessions/${sessionId}/export/markdown`, {
      responseType: 'text',
    });
  }

  exportHtml(sessionId: string): Observable<string> {
    return this.http.get(`${this.base}/sessions/${sessionId}/export/html`, {
      responseType: 'text',
    });
  }
}
