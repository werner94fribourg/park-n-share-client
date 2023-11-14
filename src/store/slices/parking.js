import { getAllParkings } from '../../utils/api';
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
      parkings.filter(parking => state.parkings.find(p => p.id === parking.id));

      parkings.forEach(parking => {
        state.parkings.push(parking);
      });
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

  return [valid, message];
};
