import { useState } from 'react';
import { Diagnosis, Entry } from '../../types.ts';
import EntryDetails from './EntryDetails.tsx';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import WorkIcon from '@mui/icons-material/Work';

interface EntryProps {
  entry: Entry;
  diagnoses: Diagnosis[];
}

const SingleEntry = ({ entry, diagnoses }: EntryProps) => {
  const [showDetails, setShowDetails] = useState(false);
  const { id, date, description, diagnosisCodes, specialist } = entry;

  return (
    <article
      key={id}
      style={{
        padding: '1rem',
        border: '1px solid black',
        borderRadius: '0.5rem',
      }}
    >
      <p>
        {date}{' '}
        <button onClick={() => setShowDetails(!showDetails)}>
          {showDetails ? <WorkIcon /> : <MedicalServicesIcon />}
        </button>
      </p>
      <p>
        <em>{description}</em>
      </p>
      {diagnosisCodes && (
        <ul>
          {diagnosisCodes.map((diagnosisCode) => {
            const diagnosis = diagnoses.find((d) => d.code === diagnosisCode);
            return (
              <li key={diagnosisCode}>
                {diagnosisCode} {diagnosis?.name}
              </li>
            );
          })}
        </ul>
      )}
      {showDetails && <EntryDetails entry={entry} />}
      <p>Diagnose by {specialist}</p>
    </article>
  );
};

export default SingleEntry;
