import { Router } from 'express';
import authRoutes from './auth.routes';
import questionRoutes from './question.routes';
import categoryRoutes from './category.routes';
import learningRoutes from './learning.routes';
import sessionRoutes from './session.routes';
import statsRoutes from './stats.routes';

const router = Router();

router.use('/auth', authRoutes);
router.use('/questions', questionRoutes);
router.use('/categories', categoryRoutes);
router.use('/learning', learningRoutes);
router.use('/sessions', sessionRoutes);
router.use('/stats', statsRoutes);

export default router;
