/**
 * Parking slice of the redux store
 * @module store
 */
import {
  getAllParkings,
  getUnvalidatedParkings,
  getOwnParkings,
  validateParking,
  sendParking,
  reserveParking,
  endReservation,
  getOwnOccupations,
} from '../../utils/api';
import { createSlice } from '@reduxjs/toolkit';

/**
 * The parking object
 * @typedef Parking
 * @property {string} _id the id of the parking
 * @property {string} name the name of the parking
 * @property {string} description the description of the parking
 * @property {number} price the hourly price of the parking
 * @property {string} type the type of the parking (indoor/outdoor)
 * @property {boolean} isValidated the validation status of the parking
 * @property {boolean} isOccupied the occupation state of the parking
 * @property {number} rating the rating of the parking
 * @property {Object} location the location of the parking, containing its address and its coordinates
 */

/**
 * The Filters object, representing the applicable filters to get the parkings
 * @typedef Filters
 * @property {undefined|string} type the type of parkings we want to retrieve
 * @property {number} maxPrice the maximal hourly price of the parkings we want to retrieve
 * @property {number} lat the latitude of the center from which we want to retrieve the parkings
 * @property {number} lng the longitude of the center from which we want to retrieve the parkings
 * @property {number} distance the distance perimeter from which we want to retrieve the parkings from the center
 */

/**
 * @typedef ParkingInitialState
 * @property {Parking[]} parkings the list of existing parkings stored in the client
 * @property {Filters} filters the applied filters when the user wants to retrieve the parkings
 * @property {Parking[]} own the list of parking that belong to the connected user
 * @property {Parking[]} unvalidated the list of unvalidated parking, only visible by an admin user
 * @property {Object[]} occupations the list of occupations done by the connected user
 *
 * The initial state for the parking store
 * @type {ParkingInitialState}
 *
 * @version 1.0.0
 * @author [Gobi Ahonon](https://github.com/ahonongobia)
 * @author [Werner Schmid](https://github.com/werner94fribourg)
 */
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

/**
 * The slice of the store representing the parking state
 * @type {import('@reduxjs/toolkit').Slice<ParkingInitialState>}
 *
 * @version 1.0.0
 * @author [Gobi Ahonon](https://github.com/ahonongobia)
 * @author [Werner Schmid](https://github.com/werner94fribourg)
 */
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
    addOccupations(state, action) {
      const {
        payload: { occupations },
      } = action;

      occupations.forEach(occupation => {
        let storedIndex = state.occupations.findIndex(
          o => o._id === occupation._id,
        );
        if (storedIndex !== -1) {
          state.occupations[storedIndex] = occupation;
        } else state.occupations.push(occupation);
      });
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

/**
 * The actions associated with the parking state
 * @type {import('@reduxjs/toolkit').CaseReducerActions<ParkingInitialState>}
 *
 * @version 1.0.0
 * @author [Gobi Ahonon](https://github.com/ahonongobia)
 * @author [Werner Schmid](https://github.com/werner94fribourg)
 */
const parkingActions = parkingSlice.actions;

/**
 * The reducer associated with the parking state
 * @type {import('@reduxjs/toolkit').Reducer<ParkingInitialState>}
 *
 * @version 1.0.0
 * @author [Gobi Ahonon](https://github.com/ahonongobia)
 * @author [Werner Schmid](https://github.com/werner94fribourg)
 */
export const parkingReducer = parkingSlice.reducer;

/**
 * Function used to add new parkings into the parking store.
 * @param {Parking[]} parkings the list of parkings we want to add in the store
 * @param {Function} dispatch the dispatcher function used to modify the store
 *
 * @version 1.0.0
 * @author [Gobi Ahonon](https://github.com/ahonongobia)
 * @author [Werner Schmid](https://github.com/werner94fribourg)
 */
export const addParkings = (parkings, dispatch) => {
  dispatch(parkingActions.addParkings(parkings));
};

/**
 * Async function used to retrieve all parkings depending on the applied filters in the application.
 * @param {number} lat the latitude of the center from which we want to load the neighboring parkings
 * @param {number} lng the longitude of the center from which we want to load the neighboring parkings
 * @param {number} distance the distance of the perimeter from which we want to load the parkings
 * @param {Object} filters the filters we want to apply to get the resulting parkings
 * @param {Function} dispatch the dispatcher function used to modify the store
 * @param {boolean} reload the reloading status of getting the parking. It will replace the actual stored parking if true, it will add the retrieved parkings to the list otherwise
 * @returns {Promise<Object>} a promise containing the validity and the returned message of retrieving the parkings
 *
 * @version 1.0.0
 * @author [Gobi Ahonon](https://github.com/ahonongobia)
 * @author [Werner Schmid](https://github.com/werner94fribourg)
 */
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

/**
 * Async function used to retrieve all the parkings belonging to the connected user.
 * @param {string} jwt the jwt token of the connected user
 * @param {Function} dispatch the dispatcher function used to modify the store
 * @returns {Promise<Object>} a promise containing the validity status of loading the user's own parkings and its sent back message
 *
 * @version 1.0.0
 * @author [Gobi Ahonon](https://github.com/ahonongobia)
 * @author [Werner Schmid](https://github.com/werner94fribourg)
 */
export const loadOwnParkings = async (jwt, dispatch) => {
  const { valid, message, parkings } = await getOwnParkings(jwt);

  if (valid) dispatch(parkingActions.addOwnParkings({ parkings }));

  return { valid, message };
};

/**
 * Async function used to get all the occupations done by the connected user.
 * @param {string} jwt the jwt token of the connected user
 * @param {Function} dispatch the dispatcher function used to modify the store
 * @returns {Promise<Object>} a promise containing the validity status of loading the user's occupations and its sent back message
 *
 * @version 1.0.0
 * @author [Gobi Ahonon](https://github.com/ahonongobia)
 * @author [Werner Schmid](https://github.com/werner94fribourg)
 */
export const loadOwnOccupations = async (jwt, dispatch) => {
  const { valid, message, occupations } = await getOwnOccupations(jwt);

  if (valid) dispatch(parkingActions.addOccupations({ occupations }));

  return { valid, message };
};

/**
 * Async function used to load all existing unvalidated parkings (admins only).
 * @param {string} jwt the jwt token of the connected user
 * @param {Function} dispatch the dispatcher function used to modify the store
 * @returns {Promise<Object>} a promise containing the validity status of loading the unvalidated parkings
 *
 * @version 1.0.0
 * @author [Gobi Ahonon](https://github.com/ahonongobia)
 * @author [Werner Schmid](https://github.com/werner94fribourg)
 */
export const loadUnvalidatedParkings = async (jwt, dispatch) => {
  const { valid, message, parkings } = await getUnvalidatedParkings(jwt);

  if (valid) dispatch(parkingActions.addUnvalidatedParkings({ parkings }));

  return { valid, message };
};

/**
 * Async function used to validate a pending parking.
 * @param {string} jwt the jwt token of the connected user
 * @param {string} id the id of the parking we want to validate
 * @param {Function} dispatch the dispatcher function used to modify the store
 * @returns {Promise<Object>} a promise containing the validity status of validation a parking and its sent back message
 *
 * @version 1.0.0
 * @author [Gobi Ahonon](https://github.com/ahonongobia)
 * @author [Werner Schmid](https://github.com/werner94fribourg)
 */
export const acceptParkingRequest = async (jwt, id, dispatch) => {
  const { valid, message, parking } = await validateParking(jwt, id);

  if (valid) dispatch(parkingActions.validateParking({ parking }));

  return { valid, message };
};

/**
 * Function used to modify the applied filters when querying the existing parkings.
 * @param {Filters} values the new values of the applied filters
 * @param {Function} dispatch the dispatcher function used to modify the store
 *
 * @version 1.0.0
 * @author [Gobi Ahonon](https://github.com/ahonongobia)
 * @author [Werner Schmid](https://github.com/werner94fribourg)
 */
export const setFilters = (values, dispatch) => {
  dispatch(parkingActions.setFilters(values));
};

/**
 * Async function used to create a new parking for a connected user.
 * @param {string} jwt the jwt token of the connected user
 * @param {FormData} parkingData the informations of the new parking we want to create
 * @param {Function} dispatch the dispatcher function used to modify the store
 * @returns {Promise<Object>} a promise containing the validity status of validation a parking, its sent back message and the invalid fields it the request was invalid
 *
 * @version 1.0.0
 * @author [Gobi Ahonon](https://github.com/ahonongobia)
 * @author [Werner Schmid](https://github.com/werner94fribourg)
 */
export const newParkingRequest = async (jwt, parkingData, dispatch) => {
  const { valid, message, parking, fields } = await sendParking(
    jwt,
    parkingData,
  );

  if (valid) dispatch(parkingActions.addNewPersonalParking({ parking }));

  return { valid, message, fields };
};

/**
 * Async function used to reserve a parking.
 * @param {string} jwt the jwt token of the connected user
 * @param {string} id the id of the parking the connected user wants to reserve
 * @param {string} sessionID the websocket session id associated with the reservation process
 * @param {Function} dispatch the dispatcher function used to modify the store
 * @returns {Promise<Object>} a promise containing the validity status of reserving a parking and its sent back message
 *
 * @version 1.0.0
 * @author [Gobi Ahonon](https://github.com/ahonongobia)
 * @author [Werner Schmid](https://github.com/werner94fribourg)
 */
export const startParkingReservation = async (jwt, id, sessionID, dispatch) => {
  const { valid, message, occupation } = await reserveParking(
    jwt,
    id,
    sessionID,
  );

  if (valid) dispatch(parkingActions.addOccupation({ occupation }));

  return { valid, message };
};

/**
 * Async function used to end the reservation of a parking.
 * @param {string} jwt the jwt token of the connected user
 * @param {string} id the id of the parking the connected user wants to reserve
 * @param {string} sessionID the websocket session id associated with the reservation process
 * @param {Function} dispatch the dispatcher function used to modify the store
 * @returns {Promise<Object>} a promise containing the validity status of ending a parking reservation and its sent back message
 *
 * @version 1.0.0
 * @author [Gobi Ahonon](https://github.com/ahonongobia)
 * @author [Werner Schmid](https://github.com/werner94fribourg)
 */
export const endParkingReservation = async (jwt, id, sessionID, dispatch) => {
  const { valid, message, occupation } = await endReservation(
    jwt,
    id,
    sessionID,
  );

  if (valid) dispatch(parkingActions.addOccupation({ occupation }));

  return { valid, message };
};
