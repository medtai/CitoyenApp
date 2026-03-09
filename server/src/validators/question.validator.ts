import { z } from 'zod';

export const createQuestionSchema = z.object({
  categoryId: z.string().min(1),
  question: z.string().min(1),
  answer: z.string().optional(),
  explanation: z.string().min(1),
  type: z.enum(['qcm', 'multi', 'open', 'list']),
  options: z.array(z.string()).default([]),
  correctAnswers: z.array(z.string()).default([]),
  difficulty: z.enum(['easy', 'medium', 'hard']).default('medium'),
  tags: z.array(z.string()).default([]),
});

export const updateQuestionSchema = createQuestionSchema.partial();
