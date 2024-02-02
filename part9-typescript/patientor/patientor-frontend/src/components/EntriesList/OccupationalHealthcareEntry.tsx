import { OccupationalHealthcareEntry as OccupationalHealthcareEntryType } from '../../types.ts';

interface OccupationalHealthcareEntryProp {
  entry: OccupationalHealthcareEntryType;
}

const OccupationalHealthcareEntry = ({
  entry,
}: OccupationalHealthcareEntryProp) => {
  const { employerName, sickLeave } = entry;
  return (
    <div>
      <p>
        Employer name: <strong>{employerName}</strong>
      </p>
      {sickLeave && (
        <div>
          <h4>Sick leave</h4>
          <p>Start date: {sickLeave?.startDate}</p>
          <p>End date: {sickLeave?.endDate}</p>
        </div>
      )}
    </div>
  );
};

export default OccupationalHealthcareEntry;
