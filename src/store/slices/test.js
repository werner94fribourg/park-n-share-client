import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  project: 'ASE 2023',
};

const testSlice = createSlice({
  name: 'test',
  initialState,
  reducers: {},
});

export const testActions = testSlice.actions;

const testReducer = testSlice.reducer;

export default testReducer;
