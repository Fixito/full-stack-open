import axios from 'axios';
import { DiaryEntry, NewDiaryEntry } from '../types.tsx';

const baseUrl = 'http://localhost:3001/api/diaries';

export const getAllDiaries = async () => {
  const { data } = await axios.get<DiaryEntry[]>(baseUrl);
  return data;
};

export const createDiary = async (newDiaryEntry: NewDiaryEntry) => {
  const { data } = await axios.post<DiaryEntry>(baseUrl, newDiaryEntry);
  return data;
};
