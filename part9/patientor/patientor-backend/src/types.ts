export type Diagnosis = {
  code: string;
  name: string;
  latin?: string;
};

export enum Gender {
  MALE = 'male',
  FEMALE = 'female',
  OTHER = 'other',
}

export type Patient = {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: Gender;
  occupation: string;
};

export type NoSensitivePatientEntry = Omit<Patient, 'ssn'>;

export type newPatientEntry = Omit<Patient, 'id'>;
