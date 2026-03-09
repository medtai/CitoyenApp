import { Response, NextFunction } from 'express';
import { AuthRequest } from './authenticate';
import { ApiError } from '../utils/apiError';

export function authorize(...roles: string[]) {
  return (req: AuthRequest, _res: Response, next: NextFunction) => {
    if (!req.userRole || !roles.includes(req.userRole)) {
      return next(ApiError.forbidden());
    }
    next();
  };
}
