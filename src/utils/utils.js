/**
 * Store of all global helper functions used in the application
 * @module helpers
 */
import axios, { AxiosError } from 'axios';
import moment from 'moment-timezone';

/**
 * Function used to make an API call to a specific url in the backend.
 * @param {string} url the url of the endpoint to which we want to make the API call
 * @param {string} method the HTTP method we want to use to make the API call
 * @param {Object} sendData the data information that is sent with the API call (headers, body, ...)
 * @param {Function} successDataHandler the handler function used to handle the data when the call is successful and send by a processed object
 * @param {number} successCode the status code of the response when we are expecting a success (200 by default)
 * @param {boolean} submitForm a boolean informing the api call that the user is submitting a form (false by default)
 * @returns {Promise<Object>} a promise returning a response object data depending on the success of the API
 *
 * @version 1.0.0
 * @author [Gobi Ahonon](https://github.com/ahonongobia)
 * @author [Werner Schmid](https://github.com/werner94fribourg)
 */
export const makeApiCall = async (
  url,
  method,
  sendData,
  successDataHandler,
  successCode = 200,
  submitForm = false,
) => {
  try {
    const response = await axios.request({ url, method, ...sendData });

    const { status: statusCode, data } = response;
    if (statusCode === successCode) return successDataHandler(data);

    throw new AxiosError('Error', null, response);
  } catch (err) {
    if (err.name === 'AxiosError') {
      if (err.code === 'ERR_NETWORK') {
        return getNetworkErrorObject();
      }
      const { response } = err;
      if (submitForm) return getErrorObjectFormSubmission(response);
      return getErrorObject(response);
    }

    return getUnknowErrorObject();
  }
};

/**
 * Function used to return a message to the user when there is a network problem in the application.
 * @returns {Object} The returned object when a network error problem happens in the application
 *
 * @version 1.0.0
 * @author [Gobi Ahonon](https://github.com/ahonongobia)
 * @author [Werner Schmid](https://github.com/werner94fribourg)
 */
export const getNetworkErrorObject = () => {
  return {
    valid: false,
    authorized: false,
    message: 'There was an error while trying to connect to the server.',
  };
};

/**
 * Function used to handle happening errors when the user tries to submit a form.
 * @param {Object} response the response object sent back to the client when there is an error with a form submission
 * @returns {Object} the returned object when a form submission error happens in the application
 *
 * @version 1.0.0
 * @author [Gobi Ahonon](https://github.com/ahonongobia)
 * @author [Werner Schmid](https://github.com/werner94fribourg)
 */
export const getErrorObjectFormSubmission = response => {
  const {
    data: { message, fields },
  } = response;
  return {
    valid: false,
    message,
    fields,
  };
};

/**
 * Function used to return a processed error object when the client received a HTTP error code back from the server.
 * @param {Object} response
 * @returns {Object} the returned error object when a http error code is sent back to the client
 *
 * @version 1.0.0
 * @author [Gobi Ahonon](https://github.com/ahonongobia)
 * @author [Werner Schmid](https://github.com/werner94fribourg)
 */
export const getErrorObject = response => {
  const {
    status,
    data: { message },
  } = response;
  return {
    valid: false,
    authorized: status !== 401 && status !== 403,
    message,
  };
};

/**
 * Function used to returned an error object to the client if an unknown error happens when trying to call the backend API.
 * @returns {Object} the returned error object of an unknow error happening when the user tries to make the backend API call
 *
 * @version 1.0.0
 * @author [Gobi Ahonon](https://github.com/ahonongobia)
 * @author [Werner Schmid](https://github.com/werner94fribourg)
 */
export const getUnknowErrorObject = () => {
  return {
    valid: false,
    authorized: false,
    message: 'An unknow error happened. Try again later.',
  };
};

/**
 * Function used to format a moment datetime into minutes and seconds.
 * @param {import('moment').Moment} time Moment object we want to format
 * @returns {string} the formatted value of the moment time into mm:ss
 *
 * @version 1.0.0
 * @author [Gobi Ahonon](https://github.com/ahonongobia)
 * @author [Werner Schmid](https://github.com/werner94fribourg)
 */
export const outputExpirationTime = time => moment.utc(time).format('mm:ss');

/**
 * Async function representing a sleep functionality using the setTimeout function: the function will resolve after waiting the time provided in the timeout
 * @param {number} time the time the application has to wait before continuing its execution
 * @returns {Promise} a promise that will resolve after waiting the amount of time given in parameter
 *
 * @version 1.0.0
 * @author [Gobi Ahonon](https://github.com/ahonongobia)
 * @author [Werner Schmid](https://github.com/werner94fribourg)
 */
export const sleep = time =>
  new Promise(resolve => {
    setTimeout(() => {
      resolve();
    }, time);
  });

/**
 * Function used to split a text into two equal size parts.
 * @param {string} text the text we want to split the content into two half parts
 * @returns {string[]} the original content split into two halfs
 *
 * @version 1.0.0
 * @author [Gobi Ahonon](https://github.com/ahonongobia)
 * @author [Werner Schmid](https://github.com/werner94fribourg)
 */
export const splitInHalf = text => {
  let middle = Math.floor(text.length / 2);
  const precedingSpace = text.lastIndexOf(' ', middle);
  const succeedindSpace = text.indexOf(' ', middle + 1);

  middle =
    middle - precedingSpace < succeedindSpace - middle
      ? precedingSpace
      : succeedindSpace;

  return [text.substring(0, middle), text.substring(middle + 1)];
};

/**
 * Function used to update a field in a state object in the case of using useReducer function
 * @param {Object} newState the new state object that will be updated
 * @param {string} field the field value we want to update
 * @param {any} value the new value of the field
 * @returns {Object} the new state object after being updated
 *
 * @version 1.0.0
 * @author [Gobi Ahonon](https://github.com/ahonongobia)
 * @author [Werner Schmid](https://github.com/werner94fribourg)
 */
export const setField = (newState, field, value) => {
  if (field.includes('reset')) {
    const resetField = field.split('_')[1];
    newState[resetField] = '';
    return newState;
  }

  newState[field] = value;
  return newState;
};

/**
 * Reducer function for the user when filling an user form.
 * @param {Object} state the state of the user object
 * @param {string} action the action object, containing the type and payload for the new state
 * @returns {Object} the state of the user object after being updated
 *
 * @version 1.0.0
 * @author [Gobi Ahonon](https://github.com/ahonongobia)
 * @author [Werner Schmid](https://github.com/werner94fribourg)
 */
export const userReducers = (state, action) => {
  const user = {
    username: '',
    email: '',
    phone: '',
    password: '',
    passwordConfirm: '',
    ...state,
  };

  const { type, payload } = action;

  if (type === 'init') return user;

  return setField(user, type, payload);
};

/**
 * Reducer function for the invalid fields when filling a user form.
 * @param {Object} state the state of the error messages
 * @param {string} action the action object, containing the type and payload for the new state
 * @returns {Object} the state of the error messages after being updated
 *
 * @version 1.0.0
 * @author [Gobi Ahonon](https://github.com/ahonongobia)
 * @author [Werner Schmid](https://github.com/werner94fribourg)
 */
export const invalidFieldsReducer = (state, action) => {
  const messages = {
    username: '',
    email: '',
    phone: '',
    password: '',
    passwordConfirm: '',
    ...state,
  };

  const { type, payload } = action;

  if (type === 'init') return messages;

  if (type === 'reset_all')
    return {
      username: '',
      email: '',
      phone: '',
      password: '',
      passwordConfirm: '',
    };

  return setField(messages, type, payload);
};

/**
 * Reducer function for the parking when filling a new parking form.
 * @param {Object} state the state of the parking object
 * @param {string} action the action object, containing the type and payload for the new state
 * @returns {Object} the state of the parking object after being updated
 *
 * @version 1.0.0
 * @author [Gobi Ahonon](https://github.com/ahonongobia)
 * @author [Werner Schmid](https://github.com/werner94fribourg)
 */
export const parkingReducers = (state, action) => {
  const parking = {
    name: '',
    description: '',
    price: 0,
    type: 'outdoor',
    coordinates: [],
    photos: [],
    ...state,
  };

  const { type, payload } = action;

  if (type === 'init') return parking;

  return setField(parking, type, payload);
};

/**
 * Reducer function for the invalid fields when filling a parking form.
 * @param {Object} state the state of the error messages
 * @param {string} action the action object, containing the type and payload for the new state
 * @returns {Object} the state of the error messages after being updated
 *
 * @version 1.0.0
 * @author [Gobi Ahonon](https://github.com/ahonongobia)
 * @author [Werner Schmid](https://github.com/werner94fribourg)
 */
export const invalidParkingFieldsReducer = (state, action) => {
  const messages = {
    name: '',
    description: '',
    price: '',
    type: '',
    address: '',
    ...state,
  };

  const { type, payload } = action;

  if (type === 'init') return messages;

  if (type === 'reset_all')
    return {
      name: '',
      description: '',
      price: '',
      type: '',
      address: '',
    };

  return setField(messages, type, payload);
};

/**
 * Reducer function for the parking filter form in the parking map.
 * @param {Object} state the state of the parking object
 * @param {string} action the action object, containing the type and payload for the new state
 * @returns {Object} the state of the parking filter object after being updated
 *
 * @version 1.0.0
 * @author [Gobi Ahonon](https://github.com/ahonongobia)
 * @author [Werner Schmid](https://github.com/werner94fribourg)
 */
export const parkingFiltersReducer = (state, action) => {
  const filters = {
    indoor: state.type === 'indoor',
    maxPrice: state.maxPrice,
  };

  const { type, payload } = action;

  if (type === 'init') return filters;

  if (type === 'reset_all') {
    return { indoor: payload.type === 'indoor', maxPrice: payload.maxPrice };
  }

  if (type === 'indoor' && typeof payload === 'boolean') {
    return {
      ...filters,
      indoor: payload,
    };
  }

  if (type === 'dot') {
    return { ...filters, dot: true };
  }

  if (type === 'maxPrice' && typeof payload === 'number') {
    return { ...filters, maxPrice: payload };
  }
};

/**
 * Function used to get the location of the navigator that is connected to the platform.
 * @returns {Object} the geolocation of the device of the client accessing the parking section.
 *
 * @version 1.0.0
 * @author [Gobi Ahonon](https://github.com/ahonongobia)
 * @author [Werner Schmid](https://github.com/werner94fribourg)
 */
export const getPosition = () =>
  new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      // Success callback function
      position => {
        // Get the user's latitude and longitude coordinates
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;

        resolve({ lat, lng });
      },
      // Error callback function
      error => {
        reject(error);
      },
    );
  });

/**
 * Function used to get the user geolocation so that it centers the parking map to where he is.
 * @returns {Object} the geolocation of the user if he activates the localisation on his navigator, otherwise a default value centered on fribourg
 *
 * @version 1.0.0
 * @author [Gobi Ahonon](https://github.com/ahonongobia)
 * @author [Werner Schmid](https://github.com/werner94fribourg)
 */
export const getUserLocation = async () => {
  try {
    if ('geolocation' in navigator) {
      const coords = await getPosition();

      return coords;
    } else return { lat: 46.8, lng: 7.15 };
  } catch (err) {
    return { lat: 46.8, lng: 7.15 };
  }
};

/**
 * Function used to calculate the distance in km between two coordinates in the earth.
 * @param {Object} point1 the coordinates of the first point
 * @param {Object} point2 the coordinates of the second point
 * @returns {number} the distance between the two points
 *
 * @version 1.0.0
 * @author [Gobi Ahonon](https://github.com/ahonongobia)
 * @author [Werner Schmid](https://github.com/werner94fribourg)
 */
export const calculateDistance = (point1, point2) => {
  const { lat: lat1, lng: lng1 } = point1;
  const { lat: lat2, lng: lng2 } = point2;

  const dLat = toRadians(lat2) - toRadians(lat1);
  const dLng = toRadians(lng2) - toRadians(lng1);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(lat1)) *
      Math.cos(toRadians(lat2)) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  const earthRadius = 6371;

  return earthRadius * c;
};

/**
 * Function used to convert a degree value into radians.
 * @param {number} deg a value expressed in degrees
 * @returns {number} the corresponding value in radians
 *
 * @version 1.0.0
 * @author [Gobi Ahonon](https://github.com/ahonongobia)
 * @author [Werner Schmid](https://github.com/werner94fribourg)
 */
export const toRadians = deg => deg * (Math.PI / 180);
