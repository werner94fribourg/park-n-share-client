import { API_URL, PIN_EXPIRATION_URL, SIGNIN_URL } from './globals';
import { makeApiCall } from './utils';
import axios from 'axios';

export const signin = async credentials => {
  const data = await makeApiCall(SIGNIN_URL, 'post', credentials, data => {
    const { message, pinCodeExpires } = data;
    return { valid: true, message, pinCodeExpires };
  });

  return data;
};

export const getPinExpiration = async email => {
  const data = await makeApiCall(
    PIN_EXPIRATION_URL.replace(':email', email),
    'get',
    undefined,
    data => {
      const { pinCodeExpires } = data;
      return { valid: true, pinCodeExpires };
    },
  );

  return data;
};

export const confirmPin = async data => {
  const response = await axios.post(`${API_URL}/users/confirm-pin`, data);
  const { status } = response;
  if (status === 200) {
    return response;
  } else {
    // TODO: Handle error
  }
};
