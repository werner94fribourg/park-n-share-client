/**
 * General redux store of the application
 * @module store
 */
import { authReducer } from './slices/auth';
import navbarReducer from './slices/navbar';
import notificationReducer from './slices/notification';
import { parkingReducer } from './slices/parking';
import usersReducer from './slices/users';
import { configureStore } from '@reduxjs/toolkit';

/**
 * General store of the application
 * @type {import('@reduxjs/toolkit').EnhancedStore}
 *
 * @version 1.0.0
 * @author [Gobi Ahonon](https://github.com/ahonongobia)
 * @author [Werner Schmid](https://github.com/werner94fribourg)
 */
const store = configureStore({
  reducer: {
    auth: authReducer,
    parking: parkingReducer,
    navbar: navbarReducer,
    users: usersReducer,
    notification: notificationReducer,
  },
});

export default store;
