import { createSlice } from '@reduxjs/toolkit';
import * as anecdoteService from '../services/anecdotes.js';

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    voteForAnecdote: (state, action) => {
      const id = action.payload.id;
      return state.map((anecdote) =>
        anecdote.id === id ? action.payload : anecdote
      );
    },
    setAnecdotes: (_state, action) => {
      return action.payload;
    },
    appendNote: (state, action) => {
      state.push(action.payload);
    },
  },
});

export const { voteForAnecdote, setAnecdotes, appendNote } =
  anecdoteSlice.actions;

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll();
    dispatch(setAnecdotes(anecdotes));
  };
};

export const createAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.create(content);
    dispatch(appendNote(newAnecdote));
  };
};

export const updateAnecdote = (anecdote) => {
  return async (dispatch) => {
    const updatedAnecdote = await anecdoteService.update(anecdote);
    dispatch(voteForAnecdote(updatedAnecdote));
  };
};

export default anecdoteSlice.reducer;
