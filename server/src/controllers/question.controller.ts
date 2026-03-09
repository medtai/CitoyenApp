import { Request, Response, NextFunction } from 'express';
import * as questionService from '../services/question.service';

export async function getQuestions(req: Request, res: Response, next: NextFunction) {
  try {
    const { category, difficulty, type, limit, offset, random } = req.query;
    const questions = await questionService.getQuestions({
      category: category as string,
      difficulty: difficulty as string,
      type: type as string,
      limit: limit ? parseInt(limit as string) : undefined,
      offset: offset ? parseInt(offset as string) : undefined,
      random: random === 'true',
    });
    res.json(questions);
  } catch (err) { next(err); }
}

export async function getQuestionById(req: Request, res: Response, next: NextFunction) {
  try {
    const question = await questionService.getQuestionById(req.params.id);
    res.json(question);
  } catch (err) { next(err); }
}

export async function getQuestionsByIds(req: Request, res: Response, next: NextFunction) {
  try {
    const { ids } = req.body;
    const questions = await questionService.getQuestionsByIds(ids);
    res.json(questions);
  } catch (err) { next(err); }
}

export async function createQuestion(req: Request, res: Response, next: NextFunction) {
  try {
    const question = await questionService.createQuestion(req.body);
    res.status(201).json(question);
  } catch (err) { next(err); }
}

export async function updateQuestion(req: Request, res: Response, next: NextFunction) {
  try {
    const question = await questionService.updateQuestion(req.params.id, req.body);
    res.json(question);
  } catch (err) { next(err); }
}

export async function deleteQuestion(req: Request, res: Response, next: NextFunction) {
  try {
    await questionService.deleteQuestion(req.params.id);
    res.status(204).send();
  } catch (err) { next(err); }
}
