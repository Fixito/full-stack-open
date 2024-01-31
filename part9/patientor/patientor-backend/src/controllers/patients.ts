import { Request, Response } from 'express';
import * as patientService from '../services/patientService';

export const getAllPatients = (_req: Request, res: Response) => {
  return res.status(200).json(patientService.getAll());
};
