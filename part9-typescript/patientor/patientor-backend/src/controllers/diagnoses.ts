import { Request, Response } from 'express';
import * as diagnosisService from '../services/diagnosisService';

export const getAllDiagnoses = (_req: Request, res: Response) => {
  return res.status(200).json(diagnosisService.getAll());
};
