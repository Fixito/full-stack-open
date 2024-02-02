import { v4 as uuid } from 'uuid';
import patients from '../../data/patients';
import { NoSensitivePatientEntry, Patient, newPatientEntry } from '../types';

export const getAll = (): NoSensitivePatientEntry[] => {
  return patients.map(
    ({ id, name, dateOfBirth, gender, occupation, entries }) => ({
      id,
      name,
      dateOfBirth,
      gender,
      occupation,
      entries,
    })
  );
};

export const findById = (patientId: string) => {
  return patients.find((p) => p.id === patientId);
};

export const create = (entry: newPatientEntry): Patient => {
  const newPatientEntry = {
    id: uuid(),
    ...entry,
  };
  patients.push(newPatientEntry);
  return newPatientEntry;
};
