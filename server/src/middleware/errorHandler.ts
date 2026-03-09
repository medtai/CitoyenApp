import { Request, Response, NextFunction } from 'express';
import { ApiError } from '../utils/apiError';

export function errorHandler(err: Error, _req: Request, res: Response, _next: NextFunction) {
  if (err instanceof ApiError) {
    return res.status(err.statusCode).json({ error: err.message });
  }

  console.error('Unhandled error:', err);
  return res.status(500).json({ error: 'Erreur interne du serveur' });
}
