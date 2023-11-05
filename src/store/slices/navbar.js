import { createSlice } from '@reduxjs/toolkit';

const initialState = { isOpen: false };

const navbarSlice = createSlice({
  name: 'navbar',
  initialState,
  reducers: {
    setOpenState(state) {
      state.isOpen = !state.isOpen;
    },
    setClosedState(state) {
      state.isOpen = false;
    },
  },
});

const navbarActions = navbarSlice.actions;

export const openNavbar = dispatch => {
  dispatch(navbarActions.setOpenState());
};

export const closeNavbar = dispatch => {
  dispatch(navbarActions.setClosedState());
};

const navbarReducer = navbarSlice.reducer;

export default navbarReducer;
