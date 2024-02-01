import { NewDiaryEntry, Visibility, Weather } from './types.tsx';

interface DiaryFromProps {
  addEntry: (diaryEntry: NewDiaryEntry) => void;
}

const DiaryForm = ({ addEntry }: DiaryFromProps) => {
  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    const target = e.target as HTMLFormElement;
    const formData = new FormData(target);
    const data = Object.fromEntries(formData) as NewDiaryEntry;
    addEntry(data);
    target.reset();
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* date */}
      <div>
        <label htmlFor='date'>Date: </label>
        <input type='date' name='date' id='date' />
      </div>
      {/* visibility */}
      <fieldset>
        <legend>Visibility</legend>
        {Object.values(Visibility).map((v) => {
          return (
            <label key={v} htmlFor={v}>
              {v}
              <input type='radio' name='visibility' id={v} value={v} />
            </label>
          );
        })}
      </fieldset>
      {/* weather */}
      <fieldset>
        <legend>Weather</legend>
        {Object.values(Weather).map((v) => {
          return (
            <label key={v} htmlFor={v}>
              {v}
              <input type='radio' name='weather' id={v} value={v} />
            </label>
          );
        })}
      </fieldset>
      {/* date */}
      <div>
        <label htmlFor='comment'>Comment: </label>
        <input type='text' name='comment' id='comment' />
      </div>
      <button>Add</button>
    </form>
  );
};

export default DiaryForm;
