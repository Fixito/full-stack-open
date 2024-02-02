import { HospitalEntry as HospitalEntryType } from '../../types.ts';

interface HosptialEntryProps {
  entry: HospitalEntryType;
}

const HospitalEntry = ({ entry }: HosptialEntryProps) => {
  const {
    discharge: { date, criteria },
  } = entry;

  return (
    <div>
      <h3>Discharge</h3>
      <p>date: {date}</p>
      <p>Criteria: {criteria}</p>
    </div>
  );
};

export default HospitalEntry;
