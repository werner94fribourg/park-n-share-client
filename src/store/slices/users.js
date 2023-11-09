import { changeProfile, getConnectedUser } from '../../utils/api';
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  me: {
    _id: '',
    email: '',
    username: '',
    phone: '',
    photo: '',
    role: '',
  },
  loading: true,
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setMe(state, action) {
      const {
        payload: { _id, email, username, phone, photo, role },
      } = action;
      state.me = {
        _id,
        email,
        username,
        phone,
        photo,
        role,
      };
      state.loading = false;
    },
    setLoading(state, action) {
      state.loading = false;
    },

    setProfilePicture(state, action) {
      state.me.photo = action.payload;
    },
  },
});

const usersActions = usersSlice.actions;

const usersReducer = usersSlice.reducer;

export default usersReducer;

export const getMe = async (token, dispatch) => {
  const { valid, user, authorized } = await getConnectedUser(token);
  if (valid) dispatch(usersActions.setMe(user));
  else dispatch(usersActions.setLoading());

  return authorized;
};

export const setProfilePicture = async (jwt, formData, dispatch) => {
  const { valid, message, user } = await changeProfile(jwt, formData);
  if (valid) {
    dispatch(usersActions.setProfilePicture(user.photo));
  }
  return { message, valid };
};
