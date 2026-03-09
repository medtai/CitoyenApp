import { PrismaClient } from '@prisma/client';
import { fromJson } from '../utils/json';

const prisma = new PrismaClient();

export async function getStats(userId: string) {
  const sessions = await prisma.quizSession.findMany({
    where: { userId },
    include: { answers: true },
  });

  if (sessions.length === 0) {
    return {
      totalSessions: 0,
      totalQuestions: 0,
      correctAnswers: 0,
      avgScore: 0,
      bestScore: 0,
      totalDuration: 0,
      categoryBreakdown: [],
    };
  }

  const totalSessions = sessions.length;
  const totalQuestions = sessions.reduce((a, s) => a + s.total, 0);
  const correctAnswers = sessions.reduce((a, s) => a + s.score, 0);
  const avgScore = Math.round(sessions.reduce((a, s) => a + s.percentage, 0) / totalSessions);
  const bestScore = Math.max(...sessions.map(s => s.percentage));
  const totalDuration = sessions.reduce((a, s) => a + s.duration, 0);

  // Per-category breakdown
  const catMap = new Map<string, { total: number; correct: number; sessions: number }>();
  for (const session of sessions) {
    const cats: string[] = fromJson(session.categories);
    for (const cat of cats) {
      if (!catMap.has(cat)) catMap.set(cat, { total: 0, correct: 0, sessions: 0 });
      const entry = catMap.get(cat)!;
      entry.sessions++;
    }
    for (const answer of session.answers) {
      // We don't have category per answer here, so we use session-level categories
      catMap; // already counted sessions above
    }
  }

  const categoryBreakdown = Array.from(catMap.entries()).map(([category, data]) => ({
    category,
    sessions: data.sessions,
  }));

  return { totalSessions, totalQuestions, correctAnswers, avgScore, bestScore, totalDuration, categoryBreakdown };
}
