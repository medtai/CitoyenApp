import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import { fromJson } from '../utils/json';
import { ApiError } from '../utils/apiError';

const router = Router();
const prisma = new PrismaClient();

function formatTopic(t: any) {
  return {
    ...t,
    sections: fromJson(t.sections),
    keyFacts: fromJson(t.keyFacts),
    schema: fromJson(t.schema),
  };
}

router.get('/', async (_req, res, next) => {
  try {
    const topics = await prisma.learningTopic.findMany({
      select: { id: true, categoryId: true, title: true, icon: true, introduction: true },
    });
    res.json(topics);
  } catch (err) { next(err); }
});

router.get('/:id', async (req, res, next) => {
  try {
    const topic = await prisma.learningTopic.findUnique({ where: { id: req.params.id } });
    if (!topic) throw ApiError.notFound('Contenu introuvable');
    res.json(formatTopic(topic));
  } catch (err) { next(err); }
});

// Also allow fetching by category
router.get('/category/:categoryId', async (req, res, next) => {
  try {
    const topic = await prisma.learningTopic.findFirst({ where: { categoryId: req.params.categoryId } });
    if (!topic) throw ApiError.notFound('Contenu introuvable pour cette catégorie');
    res.json(formatTopic(topic));
  } catch (err) { next(err); }
});

export default router;
