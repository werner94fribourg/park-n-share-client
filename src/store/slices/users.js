import { getConnectedUser } from '../../utils/api';
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
        payload: {
          _id,
          email,
          username,
          firstname,
          lastname,
          photo,
          role,
          supervisor,
        },
      } = action;
      state.me = {
        _id,
        email,
        username,
        firstname,
        lastname,
        photo,
        role,
        supervisor,
      };
      state.loading = false;
    },
    setLoading(state, action) {
      state.loading = false;
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
