import { Response, Request } from 'express';

export const createEntry = (_req: Request, res: Response) => {
  res.status(201).send('Entry created');
};
