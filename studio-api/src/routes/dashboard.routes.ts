import { Router } from 'express';
import type { DashboardSummary } from '../models/studio.models.js';
import { sessionStore } from '../services/session-store.service.js';
import { getAllReports } from '../services/readiness-report.service.js';

const router = Router();

router.get('/dashboard/summary', async (_req, res) => {
  try {
    const sessions = await sessionStore.getAll();
    const reports = await getAllReports();

    const totalSessions = sessions.length;

    // Sessions by mode
    const sessionsByMode: Record<string, number> = {};
    for (const s of sessions) {
      sessionsByMode[s.mode] = (sessionsByMode[s.mode] ?? 0) + 1;
    }

    // Average readiness score
    let averageReadinessScore = 0;
    if (reports.length > 0) {
      const total = reports.reduce((sum, r) => sum + r.readinessScore, 0);
      averageReadinessScore = Math.round(total / reports.length);
    }

    // Strongest and weakest areas from reports
    const areaCounts: Record<string, { total: number; count: number }> = {};
    for (const report of reports) {
      for (const item of report.weaknessMap) {
        if (!areaCounts[item.area]) {
          areaCounts[item.area] = { total: 0, count: 0 };
        }
        const severityScore = item.severity === 'low' ? 3 : item.severity === 'medium' ? 2 : 1;
        areaCounts[item.area].total += severityScore;
        areaCounts[item.area].count += 1;
      }
    }

    const areaAvgs = Object.entries(areaCounts).map(([area, { total, count }]) => ({
      area,
      avg: total / count,
    }));
    areaAvgs.sort((a, b) => b.avg - a.avg);

    const strongestAreas = areaAvgs.filter((a) => a.avg >= 2.5).map((a) => a.area).slice(0, 3);
    const weakestAreas = areaAvgs.filter((a) => a.avg < 2.5).map((a) => a.area).slice(0, 3);

    // If no report data, provide defaults
    if (strongestAreas.length === 0 && totalSessions > 0) {
      strongestAreas.push('Engagement');
    }
    if (weakestAreas.length === 0 && totalSessions > 0) {
      weakestAreas.push('Need more sessions for analysis');
    }

    // Most practiced track and mode
    const trackCounts: Record<string, number> = {};
    for (const s of sessions) {
      trackCounts[s.track] = (trackCounts[s.track] ?? 0) + 1;
    }
    const mostPracticedTrack = Object.entries(trackCounts)
      .sort((a, b) => b[1] - a[1])[0]?.[0] ?? '';
    const mostPracticedMode = Object.entries(sessionsByMode)
      .sort((a, b) => b[1] - a[1])[0]?.[0] ?? '';

    // Recent sessions (last 5)
    const recentSessions = sessions.slice(0, 5);

    // Recommended next mode
    const allModes = [
      'behavioral', 'coding', 'system-design', 'frontend-architecture',
      'debugging', 'code-review', 'recruiter-screen',
    ];
    const leastPracticed = allModes
      .map((m) => ({ mode: m, count: sessionsByMode[m] ?? 0 }))
      .sort((a, b) => a.count - b.count);
    const recommendedNextMode = leastPracticed[0]?.mode ?? 'behavioral';

    const summary: DashboardSummary = {
      totalSessions,
      sessionsByMode,
      averageReadinessScore,
      strongestAreas,
      weakestAreas,
      mostPracticedTrack,
      mostPracticedMode,
      recentSessions,
      recommendedNextMode,
    };

    res.json(summary);
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    res.status(500).json({ error: message });
  }
});

export default router;
