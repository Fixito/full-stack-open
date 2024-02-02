import { useEffect, useState } from 'react';
import patientService from '../../services/patients.ts';
import diagnosisService from '../../services/diagnoses.ts';
import { useNavigate, useParams } from 'react-router-dom';
import { Diagnosis, Patient } from '../../types.ts';
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import TransgenderIcon from '@mui/icons-material/Transgender';
import EntriesList from '../EntriesList';

const SingePatientPage = () => {
  const [patient, setPatient] = useState<Patient | null>(null);
  const [diagnoses, setDiagnoses] = useState<Diagnosis[] | []>([]);
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    if (!id) {
      navigate('/');
      return;
    }

    patientService
      .findById(id)
      .then((patient) => setPatient(patient))
      .catch((e: unknown) => {
        console.log(console.error(e));
        navigate('/');
      });
    diagnosisService
      .getAll()
      .then((diagnoses) => setDiagnoses(diagnoses))
      .catch((e: unknown) => {
        console.log(console.error(e));
      });
  }, [id, navigate]);

  if (!patient) {
    return <div>Loading...</div>;
  }

  const { name, gender, ssn, occupation, entries } = patient;

  return (
    <main>
      <section>
        <h2>
          {name}{' '}
          {gender === 'male' ? (
            <MaleIcon />
          ) : gender === 'female' ? (
            <FemaleIcon />
          ) : (
            <TransgenderIcon />
          )}
        </h2>
        <p>SSN:{ssn}</p>
        <p>Occupation: {occupation}</p>
      </section>
      <EntriesList entries={entries} diagnoses={diagnoses} />
    </main>
  );
};

export default SingePatientPage;
