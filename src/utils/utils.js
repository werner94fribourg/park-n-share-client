import axios, { AxiosError } from 'axios';
import moment from 'moment-timezone';

export const makeApiCall = async (
  url,
  method,
  sendData,
  successDataHandler,
  successCode = 200,
  signup = false,
) => {
  try {
    const response = await axios[method](url, sendData);

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
