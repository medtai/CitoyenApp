import { Router } from 'express';
import * as statsController from '../controllers/stats.controller';
import { authenticate } from '../middleware/authenticate';

const router = Router();

router.use(authenticate);
router.get('/', statsController.getStats);

export default router;
