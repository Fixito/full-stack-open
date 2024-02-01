import { useEffect, useState } from 'react';
import { DiaryEntry, NewDiaryEntry, Notification } from './types.tsx';
import { getAllDiaries, createDiary } from './services/diaryService.ts';
import DiaryForm from './DiaryForm.tsx';
import DiaryList from './DiaryList.tsx';
import { AxiosError } from 'axios';

const App = () => {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([]);
  const [notification, setNotification] = useState<Notification>({
    type: '',
    text: '',
  });

  const notify = ({ type, text }: Notification) => {
    setNotification({ type, text });
  };

  const addEntry = async (newDiaryEntry: NewDiaryEntry) => {
    try {
      const addedDiary = await createDiary(newDiaryEntry);
      setDiaries([...diaries, addedDiary]);
    } catch (error: unknown) {
      let errorMessage = '';

      if (error instanceof AxiosError) {
        if (error.response) {
          errorMessage = error.response.data;
        } else {
          errorMessage = 'An unexpected error occurred';
        }
      }

      notify({ type: 'error', text: errorMessage });
    }
  };

  useEffect(() => {
    getAllDiaries()
      .then((diaries) => setDiaries(diaries))
      .catch((error: unknown) => {
        let errorMessage = '';

        if (error instanceof AxiosError) {
          if (error.response) {
            errorMessage = error.response.data;
          } else {
            errorMessage = 'An unexpected error occurred';
          }
        }

        notify({ type: 'error', text: errorMessage });
      });
  }, []);

  return (
    <main>
      <h2>Add entry</h2>
      {notification.text && (
        <div role='alert' className={`notification ${notification.type}`}>
          {notification.text}
        </div>
      )}
      <DiaryForm addEntry={addEntry} />
      <DiaryList diaries={diaries} />
    </main>
  );
};

export default App;
