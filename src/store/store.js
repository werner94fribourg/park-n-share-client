import { authReducer } from './slices/auth';
import navbarReducer from './slices/navbar';
import notificationReducer from './slices/notification';
import { parkingReducer } from './slices/parking';
import usersReducer from './slices/users';
import { configureStore } from '@reduxjs/toolkit';

const store = configureStore({
  reducer: {
    auth: authReducer,
    parking: parkingReducer,
    navbar: navbarReducer,
    users: usersReducer,
    notification: notificationReducer,
  },
});

export default store;
