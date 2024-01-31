import patients from '../../data/patients';
import { NoSensitivePatientEntry } from '../types';

export const getAll = (): NoSensitivePatientEntry[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};
