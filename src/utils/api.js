import { CONFIRM_PIN_URL, PIN_EXPIRATION_URL, SIGNIN_URL } from './globals';
import { makeApiCall } from './utils';

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

export const confirmPin = async pinData => {
  const data = await makeApiCall(
    CONFIRM_PIN_URL,
    'post',
    pinData,
    data => {
      const { token, message } = data;

      return { valid: true, token, message };
    },
    200,
  );

  return data;
};
