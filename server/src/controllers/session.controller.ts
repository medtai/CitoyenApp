import { Response, NextFunction } from 'express';
import { AuthRequest } from '../middleware/authenticate';
import * as sessionService from '../services/session.service';

export async function createSession(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    const session = await sessionService.createSession(req.userId!, req.body);
    res.status(201).json(session);
  } catch (err) { next(err); }
}

export async function getSessions(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    const { limit, offset } = req.query;
    const sessions = await sessionService.getSessions(
      req.userId!,
      limit ? parseInt(limit as string) : undefined,
      offset ? parseInt(offset as string) : undefined,
    );
    res.json(sessions);
  } catch (err) { next(err); }
}

export async function getSessionById(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    const session = await sessionService.getSessionById(req.userId!, req.params.id);
    res.json(session);
  } catch (err) { next(err); }
}

export async function deleteSession(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    await sessionService.deleteSession(req.userId!, req.params.id);
    res.status(204).send();
  } catch (err) { next(err); }
}

export async function clearSessions(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    await sessionService.clearSessions(req.userId!);
    res.status(204).send();
  } catch (err) { next(err); }
}
