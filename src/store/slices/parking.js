import { getAllParkings } from '../../utils/api';
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  parkings: [],
  filters: {
    type: undefined,
    maxPrice: 25,
  },
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
    setFilters(state, action) {
      const {
        payload: { type, maxPrice },
      } = action;

      state.filters.type = type;
      state.filters.maxPrice = maxPrice;
    },
  },
});

const parkingActions = parkingSlice.actions;

export const parkingReducer = parkingSlice.reducer;

export const addParkings = (parkings, dispatch) => {
  dispatch(parkingActions.addParkings(parkings));
};

export const loadAllParkings = async (lat, lng, dist, dispatch) => {
  const { valid, parkings, message } = await getAllParkings(lat, lng, dist);

  if (valid) dispatch(parkingActions.addParkings(parkings));

  return { valid, message };
};

export const setFilters = (values, dispatch) => {
  dispatch(parkingActions.setFilters(values));
};
