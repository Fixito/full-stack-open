import { Diagnosis, Gender, newPatientEntry } from './types';

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const parseText = (text: unknown): string => {
  if (!text || !isString(text)) {
    throw new Error('Incorrect or missing field');
  }

  return text;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseDate = (date: unknown): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error('Incorrect or missing date: ' + date);
  }

  return date;
};

const isGender = (param: string): param is Gender => {
  return Object.values(Gender)
    .map((v) => v.toString())
    .includes(param);
};

const parseGender = (gender: unknown): Gender => {
  if (!gender || !isString(gender) || !isGender(gender)) {
    throw new Error('Incorrect or missing gender: ' + gender);
  }

  return gender;
};

export const toNewPatientEntry = (object: unknown): newPatientEntry => {
  if (!object || typeof object !== 'object') {
    throw new Error('Incorrect or missing data');
  }

  if (
    'name' in object &&
    'dateOfBirth' in object &&
    'ssn' in object &&
    'gender' in object &&
    'occupation' in object
  ) {
    const newEntry: newPatientEntry = {
      name: parseText(object.name),
      ssn: parseText(object.ssn),
      dateOfBirth: parseDate(object.dateOfBirth),
      gender: parseGender(object.gender),
      occupation: parseText(object.occupation),
      entries: [],
    };

    return newEntry;
  }

  throw new Error('Incorrect data: some fields are missing');
};

const parseDiagnosisCodes = (object: unknown): Array<Diagnosis['code']> => {
  if (!object || typeof object !== 'object' || !('diagnosisCodes' in object)) {
    // we will just trust the data to be in correct form
    return [] as Array<Diagnosis['code']>;
  }

  return object.diagnosisCodes as Array<Diagnosis['code']>;
};
