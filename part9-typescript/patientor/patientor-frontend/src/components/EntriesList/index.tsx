import { Diagnosis, Entry } from '../../types.ts';
import SingleEntry from './SingleEntry.tsx';

interface EntriesListProps {
  entries: Entry[];
  diagnoses: Diagnosis[];
}

const EntriesList = ({ entries, diagnoses }: EntriesListProps) => {
  return (
    <section style={{ paddingBlock: '3rem' }}>
      <h2>Entries</h2>
      <div style={{ display: 'grid', gap: '1rem' }}>
        {entries.map((entry) => {
          return (
            <SingleEntry key={entry.id} entry={entry} diagnoses={diagnoses} />
          );
        })}
      </div>
    </section>
  );
};

export default EntriesList;
