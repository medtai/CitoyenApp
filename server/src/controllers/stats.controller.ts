import { Response, NextFunction } from 'express';
import { AuthRequest } from '../middleware/authenticate';
import * as statsService from '../services/stats.service';

export async function getStats(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    const stats = await statsService.getStats(req.userId!);
    res.json(stats);
  } catch (err) { next(err); }
}
