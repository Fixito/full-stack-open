import express from 'express';
const app = express();
import { calculateBmi } from './bmiCalculator';
import { calculator, Operation } from './calculator';
import { calculateExercises } from './exerciseCalculator';

app.use(express.json());

app.get('/ping', (_req, res) => {
  res.send('pong');
});

app.get('/bmi', (req, res) => {
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);

  if (isNaN(height) || isNaN(weight)) {
    return res.status(400).json({ error: 'malformatted parameters' });
  }

  const bmi = calculateBmi(height, weight);
  return res.status(200).json({ height, weight, bmi });
});

app.post('/calculate', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { value1, value2, op } = req.body;

  if (!value1 || isNaN(Number(value1))) {
    return res.status(400).send({ error: '...' });
  }

  const result = calculator(Number(value1), Number(value2), op as Operation);
  return res.send({ result });
});

app.post('/exercises', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { target, daily_exercises } = req.body;

  if (!target || !daily_exercises) {
    return res.status(400).send({ error: 'parameters missing' });
  }

  if (
    isNaN(Number(target)) ||
    !Array.isArray(daily_exercises) ||
    !daily_exercises.every((d) => !isNaN(Number(d)))
  ) {
    return res.status(400).send({ error: 'malformatted parameters' });
  }

  const result = calculateExercises(
    Number(target),
    daily_exercises as number[]
  );
  return res.send({ result });
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
