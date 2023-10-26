import { authReducer } from './slices/auth';
import testReducer from './slices/test';
import { configureStore } from '@reduxjs/toolkit';

const store = configureStore({
  reducer: {
    auth: authReducer,
    test: testReducer,
  },
});

export default store;
