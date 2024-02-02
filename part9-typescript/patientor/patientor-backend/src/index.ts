import express from 'express';
const app = express();
import cors from 'cors';

import diagnosesRouter from './router/diagnoses';
import patientsRouter from './router/patients';

app.use(cors());
app.use(express.json());

app.get('/api/ping', (_req, res) => {
  console.log('someone pinged here');
  res.send('pong');
});

app.use('/api/diagnoses', diagnosesRouter);
app.use('/api/patients', patientsRouter);

app.use((_res, res) => res.status(404).send("Endpoint doesn't exist..."));

const PORT = 8000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
