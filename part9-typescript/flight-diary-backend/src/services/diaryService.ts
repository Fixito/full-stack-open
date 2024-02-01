import diaryData from '../../data/entries';
import { DiaryEntry, NewDiaryEntry } from '../types';

const diaries: DiaryEntry[] = diaryData;

export const getEntries = (): DiaryEntry[] => {
  return diaries;
};

export const getNonSensitiveEntries = (): DiaryEntry[] => {
  return diaries.map(({ id, date, weather, visibility, comment }) => ({
    id,
    date,
    weather,
    visibility,
    comment,
  }));
};

export const findById = (id: number): DiaryEntry | undefined => {
  const entry = diaries.find((d) => d.id === id);
  return entry;
};

export const addDiary = (entry: NewDiaryEntry): DiaryEntry => {
  const newDiaryEntry = {
    id: Math.max(...diaries.map((d) => d.id)) + 1,
    ...entry,
  };

  diaries.push(newDiaryEntry);
  return newDiaryEntry;
};
