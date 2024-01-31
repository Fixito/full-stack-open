import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: 0,
};

export const counterSLice = createSlice({
  name: 'coutner',
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    reset: (state) => {
      state.value = 0;
    },
  },
});

export const { increment, decrement, reset } = counterSLice.actions;

export default counterSLice.reducer;
