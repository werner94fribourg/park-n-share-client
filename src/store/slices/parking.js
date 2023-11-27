import {
  getAllParkings,
  getUnvalidatedParkings,
  getOwnParkings,
  validateParking,
  sendParking,
  reserveParking,
  endReservation,
} from '../../utils/api';
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  parkings: [],
  filters: {
    type: undefined,
    maxPrice: 25,
    lat: 0,
    lng: 0,
    distance: 0,
  },
  own: [],
  unvalidated: [],
  occupations: [],
};

const parkingSlice = createSlice({
  name: 'parking',
  initialState,
  reducers: {
    addParkings(state, action) {
      const {
        payload: { parkings, lat, lng, distance },
      } = action;

      parkings.forEach(parking => {
        let storedIndex = state.parkings.findIndex(p => p._id === parking._id);
        if (storedIndex !== -1) {
          state.parkings[storedIndex] = parking;
        } else state.parkings.push(parking);
      });

      state.filters.lat = lat;
      state.filters.lng = lng;
      state.filters.distance = distance;
    },
    reloadParkings(state, action) {
      const {
        payload: { parkings },
      } = action;
      state.parkings = parkings;
    },
    setFilters(state, action) {
      const {
        payload: { type, maxPrice },
      } = action;

      state.filters.type = type;
      state.filters.maxPrice = maxPrice;
    },
    addOwnParkings(state, action) {
      const {
        payload: { parkings },
      } = action;

      state.own = parkings;
    },
    addNewPersonalParking(state, action) {
      const {
        payload: { parking },
      } = action;

      const storedIndex = state.own.findIndex(p => p._id === parking._id);
      if (storedIndex !== -1) state.own[storedIndex] = parking;
      else state.own.push(parking);
    },
    addUnvalidatedParkings(state, action) {
      const {
        payload: { parkings },
      } = action;

      state.unvalidated = parkings;
    },
    validateParking(state, action) {
      const {
        payload: { parking },
      } = action;

      state.unvalidated = state.unvalidated.filter(p => p._id !== parking._id);

      const storedIndex = state.parkings.findIndex(p => p._id === parking._id);
      if (storedIndex !== -1) state.parkings[storedIndex] = parking;
    },
    addOccupation(state, action) {
      const {
        payload: { occupation },
      } = action;

      const storedIndex = state.occupations.findIndex(
        o => o._id === occupation._id,
      );

      if (storedIndex !== -1) state.occupations[storedIndex] = occupation;
      else state.occupations.push(occupation);
    },
  },
});

const parkingActions = parkingSlice.actions;

export const parkingReducer = parkingSlice.reducer;

export const addParkings = (parkings, dispatch) => {
  dispatch(parkingActions.addParkings(parkings));
};

export const loadAllParkings = async (
  lat,
  lng,
  distance,
  filters,
  dispatch,
  reload = false,
) => {
  const filterObj = {
    maxPrice: filters.maxPrice,
  };
  if (filters.type !== undefined) filterObj['type'] = filters.type;
  const params = {
    lat,
    lng,
    distance,
    ...filterObj,
  };
  const { valid, parkings, message } = await getAllParkings(params);
  if (valid)
    dispatch(
      parkingActions[reload ? 'reloadParkings' : 'addParkings']({
        lat,
        lng,
        distance,
        parkings,
      }),
    );

  return { valid, message };
};

export const loadOwnParkings = async (jwt, dispatch) => {
  const { valid, message, parkings } = await getOwnParkings(jwt);

  if (valid) dispatch(parkingActions.addOwnParkings({ parkings }));

  return { valid, message };
};

export const loadUnvalidatedParkings = async (jwt, dispatch) => {
  const { valid, message, parkings } = await getUnvalidatedParkings(jwt);

  if (valid) dispatch(parkingActions.addUnvalidatedParkings({ parkings }));

  return { valid, message };
};

export const acceptParkingRequest = async (jwt, id, dispatch) => {
  const { valid, message, parking } = await validateParking(jwt, id);

  if (valid) dispatch(parkingActions.validateParking({ parking }));

  return { valid, message };
};

export const setFilters = (values, dispatch) => {
  dispatch(parkingActions.setFilters(values));
};

export const newParkingRequest = async (jwt, parkingData, dispatch) => {
  const { valid, message, parking } = await sendParking(jwt, parkingData);

  if (valid) dispatch(parkingActions.addNewPersonalParking({ parking }));

  return { valid, message };
};

export const startParkingReservation = async (jwt, id, sessionID, dispatch) => {
  const { valid, message, occupation } = await reserveParking(
    jwt,
    id,
    sessionID,
  );

  if (valid) dispatch(parkingActions.addOccupation({ occupation }));

  return { valid, message };
};

export const endParkingReservation = async (jwt, id, sessionID, dispatch) => {
  const { valid, message, occupation } = await endReservation(
    jwt,
    id,
    sessionID,
  );

  if (valid) dispatch(parkingActions.addOccupation({ occupation }));

  return { valid, message };
};
