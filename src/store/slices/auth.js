import { confirmPin, getPinExpiration, signin, signup } from '../../utils/api';
import { sleep } from '../../utils/utils';
import { createSlice } from '@reduxjs/toolkit';
import moment from 'moment-timezone';

const initialState = {
  isAuth: false,
  jwt: '',
  correctCredentials: false,
  pinExpirationDate: '',
  timeout: 0,
};

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
  },
});

const authActions = authSlice.actions;

export const authReducer = authSlice.reducer;

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

export const createAccount = async (userData, dispatch) => {
  const data = await signup(userData);
  console.log(data);
  if (data.valid)
    dispatch(
      authActions.signin({
        pinCodeExpires: data.pinCodeExpires,
        email: userData.email,
      }),
    );

  return data;
};

export const sendPin = async (pinCode, email, dispatch) => {
  const data = await confirmPin({ pinCode, email });
  if (data.valid) dispatch(authActions.logUser(data.token));

  return data;
};

export const initialize = (token, dispatch) => {
  if (token) dispatch(authActions.logUser(token));
  else logout(dispatch);
};

export const logout = dispatch => {
  localStorage.removeItem('jwt');
  dispatch(authActions.logout());
};

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

export const updateTimeout = (pinExpirationDate, dispatch) => {
  const now = moment(Date.now());
  const diff = moment(pinExpirationDate).diff(now, 'milliseconds');
  if (diff > 0) {
    decreaseTimer(diff, dispatch);
    return;
  }
  dispatch(authActions.resetSignin());
};

const decreaseTimer = async (diff, dispatch) => {
  let remainingTime = diff;
  while (remainingTime > 0) {
    dispatch(authActions.setPinTimeout(remainingTime));
    await sleep(1000);
    remainingTime = remainingTime - 1000;
  }

  dispatch(authActions.resetSignin());
};
