import testReducer from './slices/test';
import { configureStore } from '@reduxjs/toolkit';

const store = configureStore({
  reducer: {
    test: testReducer,
  },
});

export default store;
