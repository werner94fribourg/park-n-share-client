import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  message: '',
};

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    notify: (state, action) => {
      state.message = action.payload;
    },
  },
});

const notificationActions = notificationSlice.actions;

const notificationReducer = notificationSlice.reducer;

export default notificationReducer;

export const notify = (message, dispatch) => {
  dispatch(notificationActions.notify(message));
};

export const closeNotification = dispatch => {
  dispatch(notificationActions.notify(''));
};
