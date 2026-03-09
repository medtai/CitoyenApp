import { Router } from 'express';
import * as sessionController from '../controllers/session.controller';
import { authenticate } from '../middleware/authenticate';
import { validate } from '../middleware/validate';
import { createSessionSchema } from '../validators/session.validator';

const router = Router();

router.use(authenticate);

router.post('/', validate(createSessionSchema), sessionController.createSession);
router.get('/', sessionController.getSessions);
router.get('/:id', sessionController.getSessionById);
router.delete('/:id', sessionController.deleteSession);
router.delete('/', sessionController.clearSessions);

export default router;
