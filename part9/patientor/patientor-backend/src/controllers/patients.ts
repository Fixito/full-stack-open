import { Request, Response } from 'express';
import * as patientService from '../services/patientService';
import { toNewPatientEntry } from '../utils';

export const getAllPatients = (_req: Request, res: Response) => {
  return res.status(200).json(patientService.getAll());
};

export const createPatient = (req: Request, res: Response) => {
  try {
    const newPatientEntry = toNewPatientEntry(req.body);
    const addEntry = patientService.create(newPatientEntry);
    return res.status(200).json(addEntry);
  } catch (error: unknown) {
    let errorMessage = 'Something went wront.';

    if (error instanceof Error) {
      errorMessage += ' Error:' + error.message;
    }

    return res.status(400).send(errorMessage);
  }
};
