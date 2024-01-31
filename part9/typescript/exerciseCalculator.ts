interface Result {
  periodLength: number;
  trainingDay: number;
  success: boolean;
  target: number;
  average: number;
}

interface exerciseHoursValues {
  target: number;
  exercisesHours: number[];
}

const parseArguments = (args: string[]): exerciseHoursValues => {
  if (args.length < 4) throw new Error('Not enough arguments');
  const [, , ...reset] = args;

  const isAllNumbers = reset.every((arg: string) => !isNaN(Number(arg)));

  if (isAllNumbers) {
    const [target, ...exercisesHours] = reset.map((arg) => Number(arg));
    return {
      target,
      exercisesHours,
    };
  } else {
    throw new Error('Provided values were not numbers!');
  }
};

export const calculateExercises = (
  target: number,
  exerciseHours: number[]
): Result => {
  const periodLength = exerciseHours.length;
  const trainingDay = exerciseHours.filter((e) => e !== 0).length;
  const average =
    exerciseHours.reduce((acc, current) => acc + current, 0) /
    exerciseHours.length;
  const success = average >= target;
  return {
    periodLength,
    trainingDay,
    success,
    target,
    average,
  };
};

try {
  const { target, exercisesHours } = parseArguments(process.argv);
  console.log(calculateExercises(target, exercisesHours));
} catch (error: unknown) {
  let errorMessage = 'Something bad happened.';

  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }

  console.log(errorMessage);
}
