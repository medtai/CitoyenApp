import { PrismaClient } from '@prisma/client';
import { toJson, fromJson } from '../utils/json';
import { ApiError } from '../utils/apiError';

const prisma = new PrismaClient();

function formatSession(s: any) {
  return {
    ...s,
    categories: fromJson(s.categories),
    answers: s.answers?.map((a: any) => ({
      ...a,
      userAnswer: fromJson(a.userAnswer),
    })),
  };
}

export async function createSession(userId: string, data: any) {
  const session = await prisma.quizSession.create({
    data: {
      userId,
      score: data.score,
      total: data.total,
      percentage: data.percentage,
      duration: data.duration,
      categories: toJson(data.categories),
      replayOfId: data.replayOfId,
      answers: {
        create: data.answers.map((a: any) => ({
          questionId: a.questionId,
          userAnswer: toJson(a.userAnswer),
          isCorrect: a.isCorrect,
        })),
      },
    },
    include: { answers: true },
  });

  // If this is a replay, increment replayCount on the original session
  if (data.replayOfId) {
    await prisma.quizSession.updateMany({
      where: { id: data.replayOfId, userId },
      data: { replayCount: { increment: 1 } },
    });
  }

  return formatSession(session);
}

export async function getSessions(userId: string, limit = 50, offset = 0) {
  const sessions = await prisma.quizSession.findMany({
    where: { userId },
    include: { answers: true },
    orderBy: { date: 'desc' },
    take: limit,
    skip: offset,
  });
  return sessions.map(formatSession);
}

export async function getSessionById(userId: string, sessionId: string) {
  const session = await prisma.quizSession.findFirst({
    where: { id: sessionId, userId },
    include: { answers: true },
  });
  if (!session) throw ApiError.notFound('Session introuvable');
  return formatSession(session);
}

export async function deleteSession(userId: string, sessionId: string) {
  const session = await prisma.quizSession.findFirst({ where: { id: sessionId, userId } });
  if (!session) throw ApiError.notFound('Session introuvable');
  await prisma.quizSession.delete({ where: { id: sessionId } });
}

export async function clearSessions(userId: string) {
  await prisma.quizSession.deleteMany({ where: { userId } });
}
