import { getAllParkings } from '../../utils/api';
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  parkings: [],
};

const parkingSlice = createSlice({
  name: 'parking',
  initialState,
  reducers: {
    addParkings(state, action) {
      const { payload: parkings } = action;

      parkings.forEach(parking => {
        let storedIndex = state.parkings.findIndex(p => p._id === parking._id);
        if (storedIndex !== -1) {
          state.parkings[storedIndex] = parking;
        } else state.parkings.push(parking);
      });

      state.parkings.filter(
        (parking, index) =>
          state.parkings.indexOf(p => p.id === parking.id) === index,
      );
    },
  },
});

const parkingActions = parkingSlice.actions;

export const parkingReducer = parkingSlice.reducer;

export const addParkings = (parkings, dispatch) => {
  dispatch(parkingActions.addParkings(parkings));
};

export const loadAllParkings = async dispatch => {
  const { valid, parkings, message } = await getAllParkings();

  if (valid) dispatch(parkingActions.addParkings(parkings));

  return { valid, message };
};
