import { BACKEND_URL } from './globals';
import axios, { AxiosError } from 'axios';
import moment from 'moment-timezone';
import { io } from 'socket.io-client';

export const makeApiCall = async (
  url,
  method,
  sendData,
  successDataHandler,
  successCode = 200,
  signup = false,
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
      if (signup) return getErrorObjectSignup(response);
      return getErrorObject(response);
    }

    return getUnknowErrorObject();
  }
};

export const getNetworkErrorObject = () => {
  return {
    valid: false,
    authorized: false,
    message: 'There was an error while trying to connect to the server.',
  };
};

export const getErrorObjectSignup = response => {
  const {
    data: { message, fields },
  } = response;
  return {
    valid: false,
    message,
    fields,
  };
};

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

export const getUnknowErrorObject = () => {
  return {
    valid: false,
    authorized: false,
    message: 'An unknow error happened. Try again later.',
  };
};

export const outputExpirationTime = time => moment.utc(time).format('mm:ss');

export const sleep = time =>
  new Promise(resolve => {
    setTimeout(() => {
      resolve();
    }, time);
  });

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

export const setField = (newState, field, value) => {
  if (field.includes('reset')) {
    const resetField = field.split('_')[1];
    newState[resetField] = '';
    return newState;
  }

  newState[field] = value;
  return newState;
};

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

export const toRadians = deg => deg * (Math.PI / 180);

export const setSocket = () => {
  return io.connect(BACKEND_URL, {});
};

export const disconnectSocket = socket => {
  socket.disconnect();
};
