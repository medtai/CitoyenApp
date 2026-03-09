import { Request, Response, NextFunction } from 'express';
import { AuthRequest } from '../middleware/authenticate';
import * as authService from '../services/auth.service';

export async function register(req: Request, res: Response, next: NextFunction) {
  try {
    const result = await authService.register(req.body.email, req.body.password, req.body.name);
    res.status(201).json(result);
  } catch (err) { next(err); }
}

export async function login(req: Request, res: Response, next: NextFunction) {
  try {
    const result = await authService.login(req.body.email, req.body.password);
    res.json(result);
  } catch (err) { next(err); }
}

export async function refresh(req: Request, res: Response, next: NextFunction) {
  try {
    const result = await authService.refresh(req.body.refreshToken);
    res.json(result);
  } catch (err) { next(err); }
}

export async function getMe(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    const result = await authService.getMe(req.userId!);
    res.json(result);
  } catch (err) { next(err); }
}
