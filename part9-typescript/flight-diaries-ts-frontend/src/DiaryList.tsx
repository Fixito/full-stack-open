import { DiaryEntry } from './types.tsx';

interface DiaryProps {
  diaries: DiaryEntry[];
}

const DiaryList = ({ diaries }: DiaryProps) => {
  return (
    <section>
      <h2>Diary entries</h2>
      <div>
        {diaries.map((diary) => {
          const { id, date, visibility, weather, comment } = diary;

          return (
            <article key={id}>
              <p>
                <strong>{date}</strong>
              </p>
              <p>Visibility : {visibility}</p>
              <p>Weather : {weather}</p>
              {comment && <p>{comment}</p>}
            </article>
          );
        })}
      </div>
    </section>
  );
};

export default DiaryList;
