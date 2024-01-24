import { configureStore } from '@reduxjs/toolkit';
import anecdoteReducer from './features/anecdoteSlice.js';
import filterReducer from './features/filterSlice.js';
import notficationReducer from './features/notificationSlice.js';

export const store = configureStore({
  reducer: {
    anecdotes: anecdoteReducer,
    filter: filterReducer,
    notification: notficationReducer,
  },
});
