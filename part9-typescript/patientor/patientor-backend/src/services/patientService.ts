import { v4 as uuid } from 'uuid';
import patients from '../../data/patients';
import { NoSensitivePatientEntry, Patient, newPatientEntry } from '../types';

export const getAll = (): NoSensitivePatientEntry[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

export const create = (entry: newPatientEntry): Patient => {
  const newPatientEntry = {
    id: uuid(),
    ...entry,
  };
  patients.push(newPatientEntry);
  return newPatientEntry;
};
