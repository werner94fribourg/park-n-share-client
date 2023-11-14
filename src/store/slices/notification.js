import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  message: '',
  type: '',
};

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    notify: (state, action) => {
      const {
        payload: { message, type },
      } = action;
      state.message = message;
      state.type = type;
    },
    closeNotification(state) {
      state.message = '';
      state.type = '';
    },
  },
});

const notificationActions = notificationSlice.actions;

const notificationReducer = notificationSlice.reducer;

export default notificationReducer;

export const notifySuccess = (message, dispatch) => {
  dispatch(notificationActions.notify({ message, type: 'success' }));
};

export const notifyError = (message, dispatch) => {
  dispatch(notificationActions.notify({ message, type: 'error' }));
};

export const closeNotification = dispatch => {
  dispatch(notificationActions.closeNotification());
};
