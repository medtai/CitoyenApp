import { Router } from 'express';
import * as questionController from '../controllers/question.controller';
import { authenticate } from '../middleware/authenticate';
import { authorize } from '../middleware/authorize';
import { validate } from '../middleware/validate';
import { createQuestionSchema, updateQuestionSchema } from '../validators/question.validator';

const router = Router();

// Public (or authenticated) read
router.get('/', questionController.getQuestions);
router.get('/:id', questionController.getQuestionById);
router.post('/batch', questionController.getQuestionsByIds);

// Admin only
router.post('/', authenticate, authorize('ADMIN'), validate(createQuestionSchema), questionController.createQuestion);
router.put('/:id', authenticate, authorize('ADMIN'), validate(updateQuestionSchema), questionController.updateQuestion);
router.delete('/:id', authenticate, authorize('ADMIN'), questionController.deleteQuestion);

export default router;
