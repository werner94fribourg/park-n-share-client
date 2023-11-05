import { authReducer } from './slices/auth';
import navbarReducer from './slices/navbar';
import { parkingReducer } from './slices/parking';
import usersReducer from './slices/users';
import { configureStore } from '@reduxjs/toolkit';

const store = configureStore({
  reducer: {
    auth: authReducer,
    parking: parkingReducer,
    navbar: navbarReducer,
    users: usersReducer,
  },
});

export default store;
