import { z } from 'zod';

export const createSessionSchema = z.object({
  score: z.number().int().min(0),
  total: z.number().int().min(1),
  percentage: z.number().int().min(0).max(100),
  duration: z.number().int().min(0),
  categories: z.array(z.string()),
  replayOfId: z.string().optional(),
  answers: z.array(z.object({
    questionId: z.string(),
    userAnswer: z.array(z.string()),
    isCorrect: z.boolean(),
  })),
});
