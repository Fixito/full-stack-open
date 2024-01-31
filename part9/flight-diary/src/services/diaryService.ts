import diaryData from '../../data/entries';
import { DiaryEntry, NonSensitiveDiaryEntry } from '../types';

const diaries: DiaryEntry[] = diaryData;

export const getEntries = (): DiaryEntry[] => {
  return diaries;
};

export const getNonSensitiveEntries = (): NonSensitiveDiaryEntry[] => {
  return diaries.map(({ id, date, weather, visibility }) => ({
    id,
    date,
    weather,
    visibility,
  }));
};

export const addDiary = () => {
  return null;
};
