import { Request, Response, NextFunction } from 'express';
import { ZodSchema } from 'zod';

export function validate(schema: ZodSchema) {
  return (req: Request, _res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
      return next({ statusCode: 400, message: result.error.errors.map(e => e.message).join(', '), name: 'ApiError' } as any);
    }
    req.body = result.data;
    next();
  };
}
