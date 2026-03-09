import { PrismaClient } from '@prisma/client';
import { toJson, fromJson } from '../utils/json';
import { ApiError } from '../utils/apiError';

const prisma = new PrismaClient();

interface QuestionFilters {
  category?: string;
  difficulty?: string;
  type?: string;
  limit?: number;
  offset?: number;
  random?: boolean;
}

function formatQuestion(q: any) {
  return {
    ...q,
    options: fromJson(q.options),
    correctAnswers: fromJson(q.correctAnswers),
    tags: fromJson(q.tags),
  };
}

export async function getQuestions(filters: QuestionFilters) {
  const where: any = {};
  if (filters.category) where.categoryId = filters.category;
  if (filters.difficulty) where.difficulty = filters.difficulty;
  if (filters.type) where.type = filters.type;

  const limit = filters.limit || 50;
  const offset = filters.offset || 0;

  let questions;
  if (filters.random) {
    // SQLite doesn't have good random, fetch all matching then shuffle
    const all = await prisma.question.findMany({ where });
    const shuffled = all.sort(() => Math.random() - 0.5);
    questions = shuffled.slice(0, limit);
  } else {
    questions = await prisma.question.findMany({
      where,
      take: limit,
      skip: offset,
      orderBy: { createdAt: 'desc' },
    });
  }

  return questions.map(formatQuestion);
}

export async function getQuestionById(id: string) {
  const q = await prisma.question.findUnique({ where: { id } });
  if (!q) throw ApiError.notFound('Question introuvable');
  return formatQuestion(q);
}

export async function getQuestionsByIds(ids: string[]) {
  const questions = await prisma.question.findMany({
    where: { id: { in: ids } },
  });
  return questions.map(formatQuestion);
}

export async function createQuestion(data: any) {
  const q = await prisma.question.create({
    data: {
      categoryId: data.categoryId,
      question: data.question,
      answer: data.answer,
      explanation: data.explanation,
      type: data.type,
      options: toJson(data.options || []),
      correctAnswers: toJson(data.correctAnswers || []),
      difficulty: data.difficulty || 'medium',
      tags: toJson(data.tags || []),
    },
  });
  return formatQuestion(q);
}

export async function updateQuestion(id: string, data: any) {
  const existing = await prisma.question.findUnique({ where: { id } });
  if (!existing) throw ApiError.notFound('Question introuvable');

  const updateData: any = {};
  if (data.categoryId !== undefined) updateData.categoryId = data.categoryId;
  if (data.question !== undefined) updateData.question = data.question;
  if (data.answer !== undefined) updateData.answer = data.answer;
  if (data.explanation !== undefined) updateData.explanation = data.explanation;
  if (data.type !== undefined) updateData.type = data.type;
  if (data.options !== undefined) updateData.options = toJson(data.options);
  if (data.correctAnswers !== undefined) updateData.correctAnswers = toJson(data.correctAnswers);
  if (data.difficulty !== undefined) updateData.difficulty = data.difficulty;
  if (data.tags !== undefined) updateData.tags = toJson(data.tags);

  const q = await prisma.question.update({ where: { id }, data: updateData });
  return formatQuestion(q);
}

export async function deleteQuestion(id: string) {
  const existing = await prisma.question.findUnique({ where: { id } });
  if (!existing) throw ApiError.notFound('Question introuvable');
  await prisma.question.delete({ where: { id } });
}
