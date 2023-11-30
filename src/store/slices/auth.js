/**
 * Auth slice of the redux store
 * @module store
 */
import { confirmPin, getPinExpiration, signin, signup } from '../../utils/api';
import { sleep } from '../../utils/utils';
import { createSlice } from '@reduxjs/toolkit';
import moment from 'moment-timezone';

/**
 * The authentication store object
 * @typedef AuthInitialState
 * @property {boolean} isAuth the authentication status of the user
 * @property {string} jwt the jwt token of the authenticated user
 * @property {boolean} correctCredentials the status of the user if he has entered correct credentials to log in the application
 * @property {string} pinExpirationDate the expiration date of the pin code
 * @property {number} timeout the remaining time before the pin code will expire
 * @property {boolean} isResetLinkValid the validity status of the reset password link
 * @property {string} sessionID the socket session id of the client application
 * @property {boolean} isGoogleAuth the google authentication status of the user using his gmail account
 * @property {string} googleID the google id of the user when he authenticated using his gmail account
 *
 * The initial state for the authentication store
 * @type {AuthInitialState}
 *
 * @version 1.0.0
 * @author [Gobi Ahonon](https://github.com/ahonongobia)
 * @author [Werner Schmid](https://github.com/werner94fribourg)
 */
const initialState = {
  isAuth: false,
  jwt: '',
  correctCredentials: false,
  pinExpirationDate: '',
  timeout: 0,
  isResetLinkValid: false,
  sessionID: '',
  isGoogleAuth: false,
  googleID: '',
};

/**
 * The activation status of the pin code timer
 * @type {boolean}
 */
let pinTimerActivated = false;

/**
 * The slice of the store representing the authentication state
 * @type {import('@reduxjs/toolkit').Slice<AuthInitialState>}
 *
 * @version 1.0.0
 * @author [Gobi Ahonon](https://github.com/ahonongobia)
 * @author [Werner Schmid](https://github.com/werner94fribourg)
 */
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    signin: (state, action) => {
      const {
        payload: { pinCodeExpires, email },
      } = action;
      localStorage.setItem('email', email);
      state.correctCredentials = true;
      state.pinExpirationDate = pinCodeExpires;
    },
    resetSignin(state) {
      localStorage.removeItem('email');
      state.correctCredentials = false;
      state.pinExpirationDate = '';
      state.timeout = 0;
    },
    logUser(state, action) {
      const token = action.payload;
      state.isAuth = true;
      state.jwt = token;
      state.pinExpirationDate = 0;
      localStorage.removeItem('email');
      localStorage.setItem('jwt', token);
    },
    logout(state) {
      state.isAuth = false;
      state.jwt = '';
    },
    setPinTimeout: (state, action) => {
      state.timeout = action.payload;
    },
    setResetLinkValidity(state, action) {
      state.isResetLinkValid = action.payload;
    },
    setSessionID(state, action) {
      const sessionID = action.payload;

      state.sessionID = sessionID;
    },
    setGoogleID(state, action) {
      const {
        payload: { googleID, auth },
      } = action;
      state.isGoogleAuth = auth;
      state.googleID = googleID;
    },
  },
});

/**
 * The actions associated with the authentication state
 * @type {import('@reduxjs/toolkit').CaseReducerActions<AuthInitialState>}
 *
 * @version 1.0.0
 * @author [Gobi Ahonon](https://github.com/ahonongobia)
 * @author [Werner Schmid](https://github.com/werner94fribourg)
 */
const authActions = authSlice.actions;

/**
 * The reducer associated with the authentication state
 * @type {import('@reduxjs/toolkit').Reducer<AuthInitialState>}
 *
 * @version 1.0.0
 * @author [Gobi Ahonon](https://github.com/ahonongobia)
 * @author [Werner Schmid](https://github.com/werner94fribourg)
 */
export const authReducer = authSlice.reducer;

/**
 * Async function used to log the user into the app and store the result of the login process into the store.
 * @param {Object} credentials the credential object
 * @param {Function} dispatch the dispatcher function used to modify the store
 * @returns {Promise<Object>} a promise containing the pin code and the validity of the connexion if the user has given correct credentials
 *
 * @version 1.0.0
 * @author [Gobi Ahonon](https://github.com/ahonongobia)
 * @author [Werner Schmid](https://github.com/werner94fribourg)
 */
export const connect = async (credentials, dispatch) => {
  const data = await signin(credentials);
  if (data.valid)
    dispatch(
      authActions.signin({
        pinCodeExpires: data.pinCodeExpires,
        email: credentials.email,
      }),
    );
  return data;
};

/**
 * Async function used to create a new account for an user.
 * @param {Object} userData the personal data of the user that wants to register
 * @param {Function} dispatch the dispatcher function used to modify the store
 * @returns {Promise<Object>} a promise containing the pin code and the validity of the registration if the user has given correct informations
 *
 * @version 1.0.0
 * @author [Gobi Ahonon](https://github.com/ahonongobia)
 * @author [Werner Schmid](https://github.com/werner94fribourg)
 */
export const createAccount = async (userData, dispatch) => {
  const data = await signup(userData);
  if (data.valid)
    dispatch(
      authActions.signin({
        pinCodeExpires: data.pinCodeExpires,
        email: userData.email,
      }),
    );

  return data;
};

/**
 * Async function used to confirm the pin code received by the user after successful signin/signup
 * @param {number} pinCode the pin code typed by the user to confirm the authentication
 * @param {string} email the email address of the user that wants to send a pin code confirmation
 * @param {Function} dispatch the dispatcher function used to modify the store
 * @returns {Promise<Object>} a promise containing the jwt token of the user if the pin code was correct
 *
 * @version 1.0.0
 * @author [Gobi Ahonon](https://github.com/ahonongobia)
 * @author [Werner Schmid](https://github.com/werner94fribourg)
 */
export const sendPin = async (pinCode, email, dispatch) => {
  const data = await confirmPin({ pinCode, email });
  if (data.valid) {
    dispatch(authActions.logUser(data.token));
    pinTimerActivated = false;
  }

  return data;
};

/**
 * Function used to initialize the state of the authentication by retrieving the jwt token from the localStorage
 * @param {string} token the jwt token retrieved from the localStorage
 * @param {Function} dispatch the dispatcher function used to modify the store
 *
 * @version 1.0.0
 * @author [Gobi Ahonon](https://github.com/ahonongobia)
 * @author [Werner Schmid](https://github.com/werner94fribourg)
 */
export const initialize = (token, dispatch) => {
  if (token) dispatch(authActions.logUser(token));
  else logout(dispatch);
};

/**
 * Function used to logout the user
 * @param {Function} dispatch the dispatcher function used to modify the store
 *
 * @version 1.0.0
 * @author [Gobi Ahonon](https://github.com/ahonongobia)
 * @author [Werner Schmid](https://github.com/werner94fribourg)
 */
export const logout = dispatch => {
  localStorage.removeItem('jwt');
  dispatch(authActions.logout());
};

/**
 * Function used to get and store the pin validity time of the confirmation pin code.
 * @param {string} email the email address from which we want to get the pin code expiration date
 * @param {Function} dispatch the dispatcher function used to modify the store
 * @returns {Promise} a promise that will signin the user and modify the pin code timeout if it exits
 *
 * @version 1.0.0
 * @author [Gobi Ahonon](https://github.com/ahonongobia)
 * @author [Werner Schmid](https://github.com/werner94fribourg)
 */
export const getPinValidity = async (email, dispatch) => {
  const data = await getPinExpiration(email);

  if (data.valid) {
    const { pinCodeExpires } = data;
    dispatch(authActions.signin({ email, pinCodeExpires: pinCodeExpires }));
    updateTimeout(pinCodeExpires, dispatch);
    return;
  }

  dispatch(authActions.resetSignin());
};

/**
 * Function used to update the timer when the user has to confirm his pin code.
 * @param {string} pinExpirationDate the pin expiration date
 * @param {Function} dispatch the dispatcher function used to modify the store
 *
 * @version 1.0.0
 * @author [Gobi Ahonon](https://github.com/ahonongobia)
 * @author [Werner Schmid](https://github.com/werner94fribourg)
 */
export const updateTimeout = (pinExpirationDate, dispatch) => {
  const now = moment(Date.now());
  const diff = moment(pinExpirationDate).diff(now, 'milliseconds');
  if (diff > 0) {
    decreaseTimer(diff, dispatch);
    return;
  }
  dispatch(authActions.resetSignin());
};

/**
 * Async function used to decrease the remaining time for sending the pin code.
 * @param {number} diff the difference in ms between the actual time and the pin code expiration date
 * @param {Function} dispatch the dispatcher function used to modify the store
 *
 * @version 1.0.0
 * @author [Gobi Ahonon](https://github.com/ahonongobia)
 * @author [Werner Schmid](https://github.com/werner94fribourg)
 */
const decreaseTimer = async (diff, dispatch) => {
  let remainingTime = diff;
  pinTimerActivated = true;
  while (remainingTime > 0 && pinTimerActivated) {
    dispatch(authActions.setPinTimeout(remainingTime));
    await sleep(1000);
    remainingTime = remainingTime - 1000;
  }

  dispatch(authActions.resetSignin());
};

/**
 * Function used to update the validity status of a reset password link.
 * @param {boolean} validity the validity status of the reset password link
 * @param {Function} dispatch the dispatcher function used to modify the store
 *
 * @version 1.0.0
 * @author [Gobi Ahonon](https://github.com/ahonongobia)
 * @author [Werner Schmid](https://github.com/werner94fribourg)
 */
export const setResetLinkValidity = (validity, dispatch) => {
  dispatch(authActions.setResetLinkValidity(validity));
};

/**
 * Function used to initialize the value of the sessionId when the client has started a websocket connection to the backend.
 * @param {string} sessionID the id of the started web socket session
 * @param {Function} dispatch the dispatcher function used to modify the store
 *
 * @version 1.0.0
 * @author [Gobi Ahonon](https://github.com/ahonongobia)
 * @author [Werner Schmid](https://github.com/werner94fribourg)
 */
export const setSessionID = (sessionID, dispatch) => {
  dispatch(authActions.setSessionID(sessionID));
};

/**
 * Function used to reset the stored session id for socket connexion.
 * @param {Function} dispatch the dispatcher function used to modify the store
 *
 * @version 1.0.0
 * @author [Gobi Ahonon](https://github.com/ahonongobia)
 * @author [Werner Schmid](https://github.com/werner94fribourg)
 */
export const resetSessionID = dispatch => {
  dispatch(authActions.setSessionID(''));
};

/**
 * Function used to set the googleId of the user when he successfully authenticated using gmail.
 * @param {string} googleID the google ID of the user that successfully connected used gmail
 * @param {Function} dispatch the dispatcher function used to modify the store
 *
 * @version 1.0.0
 * @author [Gobi Ahonon](https://github.com/ahonongobia)
 * @author [Werner Schmid](https://github.com/werner94fribourg)
 */
export const setGoogleID = (googleID, dispatch) => {
  dispatch(authActions.setGoogleID({ googleID, auth: true }));
};

/**
 * Function used to logout the user after he authenticated using gmail.
 * @param {Function} dispatch the dispatcher function used to modify the store
 *
 * @version 1.0.0
 * @author [Gobi Ahonon](https://github.com/ahonongobia)
 * @author [Werner Schmid](https://github.com/werner94fribourg)
 */
export const disconnectFromGoogle = dispatch => {
  dispatch(authActions.setGoogleID({ googleID: '', auth: false }));
};
