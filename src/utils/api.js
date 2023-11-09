import {
  CONFIRM_PIN_URL,
  ME_URL,
  PIN_EXPIRATION_URL,
  SIGNIN_URL,
  SIGNUP_URL,
  FORGOT_PASSWORD_URL,
  RESET_PASSWORD_URL,
} from './globals';
import { makeApiCall } from './utils';

export const signin = async credentials => {
  const data = await makeApiCall(SIGNIN_URL, 'post', credentials, data => {
    const { message, pinCodeExpires } = data;
    return { valid: true, message, pinCodeExpires };
  });

  return data;
};

export const signup = async userData => {
  const data = await makeApiCall(
    SIGNUP_URL,
    'post',
    userData,
    data => {
      const { message, pinCodeExpires } = data;
      return { valid: true, message, pinCodeExpires };
    },
    201,
    true,
  );

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

export const getConnectedUser = async token => {
  const data = await makeApiCall(
    ME_URL,
    'get',
    {
      headers: { Authorization: `Bearer ${token}` },
    },
    data => {
      const {
        data: { user },
      } = data;

      return { valid: true, authorized: true, user };
    },
  );

  return data;
};

export const sendForgotPassword = async email => {
  const data = await makeApiCall(
    FORGOT_PASSWORD_URL,
    'post',
    { email },
    data => {
      const { message } = data;

      return { valid: true, message };
    },
  );

  return data;
};

export const getResetLinkValidity = async resetToken => {
  const data = await makeApiCall(
    RESET_PASSWORD_URL.replace(':resetToken', resetToken),
    'get',
    undefined,
    data => {
      const {
        data: { valid: validity },
      } = data;

      return { valid: true, validity };
    },
  );

  return data;
};

export const resetPassword = async (resetToken, newValues) => {
  const data = await makeApiCall(
    RESET_PASSWORD_URL.replace(':resetToken', resetToken),
    'patch',
    newValues,
    data => {
      const { token, message } = data;
      return { valid: true, token, message };
    },
  );

  return data;
};
