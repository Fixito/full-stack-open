import { createSlice } from '@reduxjs/toolkit';

const notificationSlice = createSlice({
  name: 'notification',
  initialState: '',
  reducers: {
    notify: (_state, action) => {
      return action.payload;
    },
    clearNotification: () => {
      return '';
    },
  },
});

export const { notify, clearNotification } = notificationSlice.actions;

export const setNotification = (message, delay = 5000) => {
  return async (dispatch) => {
    dispatch(notify(message));

    setTimeout(() => {
      dispatch(clearNotification());
    }, delay);
  };
};

export default notificationSlice.reducer;
