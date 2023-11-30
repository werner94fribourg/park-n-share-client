/**
 * Store of all global api call functions used in the application.
 *
 * @version 1.0.0
 * @author [Gobi Ahonon](https://github.com/ahonongobia)
 * @author [Werner Schmid](https://github.com/werner94fribourg)
 */
import {
  CONFIRM_PIN_URL,
  ME_URL,
  PIN_EXPIRATION_URL,
  SIGNIN_URL,
  SIGNUP_URL,
  FORGOT_PASSWORD_URL,
  SEND_CONFIRMATION_EMAIL_URL,
  UPDATE_PASSWORD_URL,
  CONFIRM_EMAIL_URL,
  RESET_PASSWORD_URL,
  PARKINGS_URL,
  GEOAPI_AUTOCOMPLETE_URL,
  SINGLE_PARKING_URL,
  OWN_PARKINGS_URL,
  VALIDATE_PARKING_URL,
  RESERVE_PARKING_URL,
  END_RESERVATION_URL,
  OWN_OCCUPATIONS_URL,
  GET_GOOGLE_SIGNUP_LINK_URL,
} from './globals';
import { makeApiCall } from './utils';
import axios from 'axios';

/**
 * Function used to sign the user into the application.
 * @param {Object} credentials the credentials object used to log into the application (i.e. email and password)
 * @returns {Promise<Object>} a promise containing the response retrieved from the login attempt
 *
 * @version 1.0.0
 * @author [Gobi Ahonon](https://github.com/ahonongobia)
 * @author [Werner Schmid](https://github.com/werner94fribourg)
 */
export const signin = async credentials => {
  const data = await makeApiCall(
    SIGNIN_URL,
    'post',
    { data: credentials },
    data => {
      const { message, pinCodeExpires } = data;
      return { valid: true, message, pinCodeExpires };
    },
  );

  return data;
};

/**
 * Function used to register the user into the application.
 * @param {Object} userData the personal data sent by the user to register into the platform
 * @returns {Promise<Object>} a promise containing the response retrieved from the registration attempt
 *
 * @version 1.0.0
 * @author [Gobi Ahonon](https://github.com/ahonongobia)
 * @author [Werner Schmid](https://github.com/werner94fribourg)
 */
export const signup = async userData => {
  const data = await makeApiCall(
    SIGNUP_URL,
    'post',
    {
      data: userData,
    },
    data => {
      const { message, pinCodeExpires } = data;
      return { valid: true, message, pinCodeExpires };
    },
    201,
    true,
  );

  return data;
};

/**
 * Function used to get the expiration time of the pin code after successfully giving the credentials of the user.
 * @param {string} email the email address from which we want to retrieve the expiration time
 * @returns {Promise<Object>} a promise containing the expiration time of the pin code
 *
 * @version 1.0.0
 * @author [Gobi Ahonon](https://github.com/ahonongobia)
 * @author [Werner Schmid](https://github.com/werner94fribourg)
 */
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

/**
 * Function used to send the pin code to confirm the authentication of the user.
 * @param {Object} pinData the data sent to confirm the pin code (email and pin code)
 * @returns {Promise<Object>} a promise containing the jwt token and the success login message
 *
 * @version 1.0.0
 * @author [Gobi Ahonon](https://github.com/ahonongobia)
 * @author [Werner Schmid](https://github.com/werner94fribourg)
 */
export const confirmPin = async pinData => {
  const data = await makeApiCall(
    CONFIRM_PIN_URL,
    'post',
    { data: pinData },
    data => {
      const { token, message } = data;

      return { valid: true, token, message };
    },
    200,
  );

  return data;
};

/**
 * Function used to get the personal informations of a connected user.
 * @param {string} token the jwt authentication token of the connected user
 * @returns {Promise<Object>} a promise containing the personal informations of the connected user
 *
 * @version 1.0.0
 * @author [Gobi Ahonon](https://github.com/ahonongobia)
 * @author [Werner Schmid](https://github.com/werner94fribourg)
 */
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

/**
 * Function used to send a request for changing the password when the user has forgotten it.
 * @param {string} email the email address of the user that has forgotten his password
 * @returns {Promise<Object>} a promise containing a confirmation message that the forgot password link was correctly sent to the email address
 *
 * @version 1.0.0
 * @author [Gobi Ahonon](https://github.com/ahonongobia)
 * @author [Werner Schmid](https://github.com/werner94fribourg)
 */
export const sendForgotPassword = async email => {
  const data = await makeApiCall(
    FORGOT_PASSWORD_URL,
    'post',
    { data: { email } },
    data => {
      const { message } = data;

      return { valid: true, message };
    },
  );

  return data;
};

/**
 * Function used to get a confirmation link to the email address of the connected user.
 * @param {string} token the jwt authentication token of the connected user
 * @returns {Promise<Object>} a promise containing a confirmation message that the email was successfully send to the email address
 *
 * @version 1.0.0
 * @author [Gobi Ahonon](https://github.com/ahonongobia)
 * @author [Werner Schmid](https://github.com/werner94fribourg)
 */
export const sendConfirmationEmail = async token => {
  const data = await makeApiCall(
    SEND_CONFIRMATION_EMAIL_URL,
    'get',
    {
      headers: { Authorization: `Bearer ${token}` },
    },
    data => {
      const { message } = data;

      return { valid: true, message };
    },
  );

  return data;
};

/**
 * Function used to confirm the email address of an user, by accessing the link that was sent to his email address.
 * @param {string} confToken the confirmation token used to confirm an email address
 * @returns {Promise<Object>} a promise containing the success message if the user successfully confirmed his email address
 *
 * @version 1.0.0
 * @author [Gobi Ahonon](https://github.com/ahonongobia)
 * @author [Werner Schmid](https://github.com/werner94fribourg)
 */
export const confirmEmail = async confToken => {
  const data = await makeApiCall(
    CONFIRM_EMAIL_URL.replace(':confToken', confToken),
    'patch',
    undefined,
    data => {
      const { message } = data;

      return { valid: true, message };
    },
  );

  return data;
};

/**
 * Function used to update the profile of the connected user.
 * @param {string} token the jwt authentication token of the connected user
 * @param {FormData} formData the updated data of the connected user
 * @returns {Promise<Object>} a promise containing the updated personal data of the connected user
 *
 * @version 1.0.0
 * @author [Gobi Ahonon](https://github.com/ahonongobia)
 * @author [Werner Schmid](https://github.com/werner94fribourg)
 */
export const changeProfile = async (token, formData) => {
  const data = await makeApiCall(
    ME_URL,
    'patch',
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: formData,
    },
    data => {
      const {
        data: { user },
      } = data;

      return {
        valid: true,
        message: 'Profile picture successfully updated!',
        user,
      };
    },
  );
  return data;
};

/**
 * Function used to update the password of the user if he is connected.
 * @param {string} token the jwt authentication token of the connected user
 * @param {string} passwordCurrent the current password of the connected user
 * @param {string} password the new password of the connected user
 * @param {string} passwordConfirm the new password confirmation of the connected user
 *
 * @version 1.0.0
 * @author [Gobi Ahonon](https://github.com/ahonongobia)
 * @author [Werner Schmid](https://github.com/werner94fribourg)
 * @returns {Promise<Object>} a promise containing the success message if the connected user has updated his password and a new jwt token associated with the new password
 *
 * @version 1.0.0
 * @author [Gobi Ahonon](https://github.com/ahonongobia)
 * @author [Werner Schmid](https://github.com/werner94fribourg)
 */
export const updatePassword = async (
  token,
  passwordCurrent,
  password,
  passwordConfirm,
) => {
  const data = await makeApiCall(
    UPDATE_PASSWORD_URL,
    'patch',
    {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      data: {
        passwordCurrent,
        password,
        passwordConfirm,
      },
    },
    data => {
      const { message, token } = data;
      return { valid: true, message, token };
    },
    200,
    true,
  );

  return data;
};

/**
 * Function used to get the validity of a reset email link.
 * @param {string} resetToken the unique resetToken sent to the user by email to be able to change his forgotten password
 * @returns {Promise<Object>} a promise informing if the reset email link is a valid one
 *
 * @version 1.0.0
 * @author [Gobi Ahonon](https://github.com/ahonongobia)
 * @author [Werner Schmid](https://github.com/werner94fribourg)
 */
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

/**
 * Function used to reset the password when the user has forgotten it.
 * @param {string} resetToken the unique resetToken sent to the user by email to be able to change his forgotten password
 * @param {Object} newValues the new value of the password and a confirmation of it
 * @returns {Promise<Object>} a promise containing a successful message when the user has changed his password and the new jwt token to connect him in the application
 *
 * @version 1.0.0
 * @author [Gobi Ahonon](https://github.com/ahonongobia)
 * @author [Werner Schmid](https://github.com/werner94fribourg)
 */
export const resetPassword = async (resetToken, newValues) => {
  const data = await makeApiCall(
    RESET_PASSWORD_URL.replace(':resetToken', resetToken),
    'patch',
    { data: newValues },
    data => {
      const { token, message } = data;
      return { valid: true, token, message };
    },
    200,
    true,
  );

  return data;
};

/**
 * Function used to get all available parkings in the application.
 * @param {Object} params the query parameter object of the parkings we want to retrieve (maxPrice, indoor, ...)
 * @returns {Promise<Object>} a promise containing a list of the requested parkings
 *
 * @version 1.0.0
 * @author [Gobi Ahonon](https://github.com/ahonongobia)
 * @author [Werner Schmid](https://github.com/werner94fribourg)
 */
export const getAllParkings = async params => {
  const data = await makeApiCall(
    PARKINGS_URL,
    'get',
    { params: { minPrice: 0, ...params } },
    data => {
      const {
        data: { parkings },
      } = data;
      return { valid: true, parkings };
    },
  );

  return data;
};

/**
 * Function used to get all unvalidated parkings in the application (accessible to admin only).
 * @param {jwt} token the jwt token of the connected user
 * @returns {Promise<Object>} a promise containing the list of the unvalidated parkings in the application
 *
 * @version 1.0.0
 * @author [Gobi Ahonon](https://github.com/ahonongobia)
 * @author [Werner Schmid](https://github.com/werner94fribourg)
 */
export const getUnvalidatedParkings = async token => {
  const data = await makeApiCall(
    PARKINGS_URL,
    'get',
    {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      params: { isValidated: false },
    },
    data => {
      const {
        data: { parkings },
      } = data;
      return { valid: true, parkings };
    },
  );

  return data;
};

/**
 * Function used to get the informations of an existing parking.
 * @param {string} id the id of the parking from which we want to retrieve the informations
 * @param {string} token the jwt token of the connected user
 * @returns {Promise<Object>} a promise containing the informations of the requested parking
 *
 * @version 1.0.0
 * @author [Gobi Ahonon](https://github.com/ahonongobia)
 * @author [Werner Schmid](https://github.com/werner94fribourg)
 */
export const getParking = async (id, token = '') => {
  const queryObj =
    token !== ''
      ? {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      : undefined;
  const data = await makeApiCall(
    SINGLE_PARKING_URL.replace(':id', id),
    'get',
    queryObj,
    data => {
      const {
        data: { parking },
      } = data;

      return { valid: true, parking };
    },
  );

  return data;
};

/**
 * Function used to get the own parkings of the connected user.
 * @param {string} token the jwt authentication token of the connected user
 * @returns {Promise<Object>} a promise containing the parkings of the connected user
 *
 * @version 1.0.0
 * @author [Gobi Ahonon](https://github.com/ahonongobia)
 * @author [Werner Schmid](https://github.com/werner94fribourg)
 */
export const getOwnParkings = async token => {
  const data = await makeApiCall(
    OWN_PARKINGS_URL,
    'get',
    {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    },
    data => {
      const {
        data: { parkings },
      } = data;

      return { valid: true, parkings };
    },
  );

  return data;
};

/**
 * Function used to validate a parking and integrate it into the platform.
 * @param {string} token the jwt authentication token of the connected user
 * @param {string} id the id of the parking we want to validate
 * @returns {Promise<Object>} a promise containing the updated parking
 *
 * @version 1.0.0
 * @author [Gobi Ahonon](https://github.com/ahonongobia)
 * @author [Werner Schmid](https://github.com/werner94fribourg)
 */
export const validateParking = async (token, id) => {
  const data = await makeApiCall(
    VALIDATE_PARKING_URL.replace(':id', id),
    'patch',
    {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    },
    data => {
      const {
        data: { parking },
      } = data;

      return {
        valid: true,
        message: 'Parking successfully validated.',
        parking,
      };
    },
  );

  return data;
};

/**
 * Function used to send a new parking request.
 * @param {string} token the jwt authentication token of the connected user
 * @param {Object} parking the new parking that the connected user wants to add in the platform
 * @returns {Promise<Object>} a promise containing the parking awaiting admin validation
 *
 * @version 1.0.0
 * @author [Gobi Ahonon](https://github.com/ahonongobia)
 * @author [Werner Schmid](https://github.com/werner94fribourg)
 */
export const sendParking = async (token, parking) => {
  const data = await makeApiCall(
    PARKINGS_URL,
    'post',
    {
      data: parking,
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'mutipart/form-data',
      },
    },
    data => {
      const {
        message,
        data: { parking },
      } = data;

      return {
        valid: true,
        message,
        parking,
      };
    },
    201,
    true,
  );

  return data;
};

/**
 * Function used to reserve a parking slot.
 * @param {string} token the jwt authentication token of the connected user
 * @param {string} id the id of the parking the connected user wants to reserve
 * @param {string} sessionID the initialized websocket session id of the connected user
 * @returns {Promise<Object>} a promise containing the new occupation of the parking
 *
 * @version 1.0.0
 * @author [Gobi Ahonon](https://github.com/ahonongobia)
 * @author [Werner Schmid](https://github.com/werner94fribourg)
 */
export const reserveParking = async (token, id, sessionID) => {
  const data = await makeApiCall(
    RESERVE_PARKING_URL.replace(':id', id),
    'patch',
    {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
        sessionID,
      },
    },
    data => {
      const {
        message,
        data: { occupation },
      } = data;

      return {
        valid: true,
        message,
        occupation,
      };
    },
  );

  return data;
};

/**
 * Function used to end a existing parking reservation.
 * @param {string} token the jwt authentication token of the connected
 * @param {string} id the id of the parking for which the connected user wants to end the reservation
 * @param {string} sessionID the initialized websocket session id of the connected user
 * @returns {Promise<Object>} a promise containing the finished occupation of the parking
 *
 * @version 1.0.0
 * @author [Gobi Ahonon](https://github.com/ahonongobia)
 * @author [Werner Schmid](https://github.com/werner94fribourg)
 */
export const endReservation = async (token, id, sessionID) => {
  const data = await makeApiCall(
    END_RESERVATION_URL.replace(':id', id),
    'patch',
    {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
        sessionID,
      },
    },
    data => {
      const {
        message,
        data: { occupation },
      } = data;

      return {
        valid: true,
        message,
        occupation,
      };
    },
  );

  return data;
};

/**
 * Function used to get all occupations of the connected user.
 * @param {jwt} token the jwt authentication token of the connected user
 * @returns {Promise<Object>} a promise containing all the existing occupations of the connected user
 *
 * @version 1.0.0
 * @author [Gobi Ahonon](https://github.com/ahonongobia)
 * @author [Werner Schmid](https://github.com/werner94fribourg)
 */
export const getOwnOccupations = async token => {
  const data = await makeApiCall(
    OWN_OCCUPATIONS_URL,
    'get',
    {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    },
    data => {
      const {
        data: { occupations },
      } = data;

      return { valid: true, occupations };
    },
  );

  return data;
};

/**
 * Function used to get the authentication link with google on the backend application.
 * @param {string} sessionID the initialized websocket session id of the connected user
 * @returns {Promise<Object>} a promise containing the link to authenticate using google in the backend application
 *
 * @version 1.0.0
 * @author [Gobi Ahonon](https://github.com/ahonongobia)
 * @author [Werner Schmid](https://github.com/werner94fribourg)
 */
export const getSignupLink = async sessionID => {
  const data = await makeApiCall(
    GET_GOOGLE_SIGNUP_LINK_URL,
    'get',
    {
      headers: {
        'Content-Type': 'application/json',
        sessionID,
      },
    },
    data => {
      const { url } = data;

      return {
        valid: true,
        url,
      };
    },
  );

  return data;
};

/**
 * Function used to get a list of address suggestions for an address.
 * @param {string} query the string query from which we want to get the complete addresses suggestions.
 * @returns {Promise<Object>} a promise containing a list of address suggestions
 *
 * @version 1.0.0
 * @author [Gobi Ahonon](https://github.com/ahonongobia)
 * @author [Werner Schmid](https://github.com/werner94fribourg)
 */
export const getSuggestions = async query => {
  const {
    data: { features },
  } = await axios.get(GEOAPI_AUTOCOMPLETE_URL, {
    params: {
      text: `${query}`,
      apiKey: process.env.REACT_APP_GEOAPIFY_API_KEY,
      limit: 30,
      bbox: 'bbox=5.95592%2C-45.8183%3B10.49212%2C-47.8085&',
    },
  });

  const suggestions = features
    .map(feature => ({
      coordinates: feature.geometry.coordinates,
      country: feature.properties.country,
      suggestion: feature.properties.formatted,
    }))
    .filter(suggestion => suggestion.country === 'Switzerland');

  return suggestions.filter((_, index) => index < 5);
};
