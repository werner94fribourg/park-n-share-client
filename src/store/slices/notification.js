import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  message: '',
  type: '',
  confirmNotification: '',
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
    setConfirmNotification(state, action) {
      const confirmNotification = action.payload;

      state.confirmNotification = confirmNotification;
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

export const setConfirmNotification = (message, dispatch) => {
  dispatch(notificationActions.setConfirmNotification(message));
};

export const resetConfirmNotification = dispatch => {
  dispatch(notificationActions.setConfirmNotification(''));
};
