import { Entry } from '../../types';
import { assertNever } from '../../utils.ts';
import HealthCheckEntry from './HealthCheckEntry';
import HospitalEntry from './HospitalEntry';
import OccupationalHealthcareEntry from './OccupationalHealthcareEntry';

interface EntryDetailsProps {
  entry: Entry;
}

const EntryDetails = ({ entry }: EntryDetailsProps) => {
  switch (entry.type) {
    case 'Hospital':
      return <HospitalEntry entry={entry} />;
    case 'HealthCheck':
      return <HealthCheckEntry entry={entry} />;
    case 'OccupationalHealthcare':
      return <OccupationalHealthcareEntry entry={entry} />;
    default:
      assertNever(entry);
  }
};

export default EntryDetails;
