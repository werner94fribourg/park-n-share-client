import { changeProfile, getConnectedUser } from '../../utils/api';
import { createSlice } from '@reduxjs/toolkit';

/**
 * Users slice of the redux store
 * @module store
 */

/**
 * The user object
 * @typedef User
 * @property {string} _id the id of the user
 * @property {string} email the email of the user
 * @property {string} username the username of the user
 * @property {string} phone the phone number of the user
 * @property {string} photo the photo of the user
 * @property {string} role the role of the user
 * @property {boolean} isEmailConfirmed the user's email confirmation status
 */

/**
 * The users store object
 * @typedef UsersInitialState
 * @property {User} me the data of the connected user
 * @property {boolean} loading the loading status of the connected user
 *
 * The initial state for the user store
 * @type {UsersInitialState}
 *
 * @version 1.0.0
 * @author [Gobi Ahonon](https://github.com/ahonongobia)
 * @author [Werner Schmid](https://github.com/werner94fribourg)
 */
const initialState = {
  me: {
    _id: '',
    email: '',
    username: '',
    phone: '',
    photo: '',
    role: '',
    isEmailConfirmed: false,
  },
  loading: true,
};

/**
 * The slice of the store representing the users state
 * @type {import('@reduxjs/toolkit').Slice<UsersInitialState>}
 *
 * @version 1.0.0
 * @author [Gobi Ahonon](https://github.com/ahonongobia)
 * @author [Werner Schmid](https://github.com/werner94fribourg)
 */
const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setMe(state, action) {
      const {
        payload: { _id, email, username, phone, photo, role, isEmailConfirmed },
      } = action;

      state.me = {
        _id,
        email,
        username,
        phone,
        photo,
        role,
        isEmailConfirmed,
      };
      state.loading = false;
    },
    setLoading(state) {
      state.loading = false;
    },

    setProfilePicture(state, action) {
      state.me.photo = action.payload;
    },
  },
});

/**
 * The actions associated with the users state
 * @type {import('@reduxjs/toolkit').CaseReducerActions<UsersInitialState>}
 *
 * @version 1.0.0
 * @author [Gobi Ahonon](https://github.com/ahonongobia)
 * @author [Werner Schmid](https://github.com/werner94fribourg)
 */
const usersActions = usersSlice.actions;

/**
 * The reducer associated with the users state
 * @type {import('@reduxjs/toolkit').Reducer<UsersInitialState>}
 *
 * @version 1.0.0
 * @author [Gobi Ahonon](https://github.com/ahonongobia)
 * @author [Werner Schmid](https://github.com/werner94fribourg)
 */
const usersReducer = usersSlice.reducer;

export default usersReducer;

/**
 * Async function used to get the data of the connected user.
 * @param {string} token the jwt token of the connected user
 * @param {Function} dispatch the dispatcher function used to modify the store
 * @returns {Promise<Object>} a promise containing the authorization success of the getting process and the role of the user
 *
 * @version 1.0.0
 * @author [Gobi Ahonon](https://github.com/ahonongobia)
 * @author [Werner Schmid](https://github.com/werner94fribourg)
 */
export const getMe = async (token, dispatch) => {
  const { valid, user, authorized } = await getConnectedUser(token);
  if (valid) dispatch(usersActions.setMe(user));
  else dispatch(usersActions.setLoading());

  return [authorized, user?.role];
};

/**
 * Async function used to update the profile picture of the user.
 * @param {string} jwt the jwt token of the connected user
 * @param {FormData} formData the form data object containing the user profile picture
 * @param {Function} dispatch the dispatcher function used to modify the store
 * @returns {Promise<Object>} a promise containing the returned message and the validity of update call
 *
 * @version 1.0.0
 * @author [Gobi Ahonon](https://github.com/ahonongobia)
 * @author [Werner Schmid](https://github.com/werner94fribourg)
 */
export const setProfilePicture = async (jwt, formData, dispatch) => {
  const { valid, message, user } = await changeProfile(jwt, formData);
  if (valid) {
    dispatch(usersActions.setProfilePicture(user.photo));
  }
  return { message, valid };
};
