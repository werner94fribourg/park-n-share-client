import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  displayedParking: null,
  parkings: [],
};

const parkingSlice = createSlice({
  name: 'parking',
  initialState,
  reducers: {
    addParkings(state, action) {
      const { payload: parkings } = action;
      parkings.forEach(parking => state.parkings.push(parking));
    },
  },
});

const parkingActions = parkingSlice.actions;

export const parkingReducer = parkingSlice.reducer;

export const addParkings = (parkings, dispatch) => {
  dispatch(parkingActions.addParkings(parkings));
};
