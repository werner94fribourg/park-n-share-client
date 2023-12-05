/**
 * Store of all global parameters used in the application.
 * @module globals
 */
import {
  AccountCircle,
  CarRental,
  Key,
  LocalParking,
} from '@mui/icons-material';

/**
 * Base URL of the backend
 * @type {string}
 *
 * @version 1.0.0
 * @author [Gobi Ahonon](https://github.com/ahonongobia)
 * @author [Werner Schmid](https://github.com/werner94fribourg)
 */
export const BACKEND_URL = 'https://park-n-share.azurewebsites.net';

/**
 * Base URL of the GEO API, used to handle coordinates and addresses
 * @type {string}
 *
 * @version 1.0.0
 * @author [Gobi Ahonon](https://github.com/ahonongobia)
 * @author [Werner Schmid](https://github.com/werner94fribourg)
 */
export const GEOAPI_URL = 'https://api.geoapify.com/v1/geocode';

/**
 * URL of the autocomplete resource in the GEO API
 * @type {string}
 *
 * @version 1.0.0
 * @author [Gobi Ahonon](https://github.com/ahonongobia)
 * @author [Werner Schmid](https://github.com/werner94fribourg)
 */
export const GEOAPI_AUTOCOMPLETE_URL = GEOAPI_URL + '/autocomplete';

/**
 * Base URL of the backend API
 * @type {string}
 *
 * @version 1.0.0
 * @author [Gobi Ahonon](https://github.com/ahonongobia)
 * @author [Werner Schmid](https://github.com/werner94fribourg)
 */
export const API_URL = `${BACKEND_URL}/api/v1`;

/**
 * Base URL of the user resource in the backend
 * @type {string}
 *
 * @version 1.0.0
 * @author [Gobi Ahonon](https://github.com/ahonongobia)
 * @author [Werner Schmid](https://github.com/werner94fribourg)
 */
export const USERS_URL = API_URL + '/users';

/**
 * URL of the users/signin endpoint
 * @type {string}
 *
 * @version 1.0.0
 * @author [Gobi Ahonon](https://github.com/ahonongobia)
 * @author [Werner Schmid](https://github.com/werner94fribourg)
 */
export const SIGNIN_URL = USERS_URL + '/signin';

/**
 * URL of the users/signup endpoint
 * @type {string}
 *
 * @version 1.0.0
 * @author [Gobi Ahonon](https://github.com/ahonongobia)
 * @author [Werner Schmid](https://github.com/werner94fribourg)
 */
export const SIGNUP_URL = USERS_URL + '/signup';

/**
 * URL of the users/google/signup/link endpoint
 * @type {string}
 *
 * @version 1.0.0
 * @author [Gobi Ahonon](https://github.com/ahonongobia)
 * @author [Werner Schmid](https://github.com/werner94fribourg)
 */
export const GET_GOOGLE_SIGNUP_LINK_URL = USERS_URL + '/google/signup/link';

/**
 * URL of the users/:email/pin-expiration endpoint
 * @type {string}
 *
 * @version 1.0.0
 * @author [Gobi Ahonon](https://github.com/ahonongobia)
 * @author [Werner Schmid](https://github.com/werner94fribourg)
 */
export const PIN_EXPIRATION_URL = USERS_URL + '/:email/pin-expiration';

/**
 * URL of the users/confirm-pin endpoint
 * @type {string}
 *
 * @version 1.0.0
 * @author [Gobi Ahonon](https://github.com/ahonongobia)
 * @author [Werner Schmid](https://github.com/werner94fribourg)
 */
export const CONFIRM_PIN_URL = USERS_URL + '/confirm-pin';

/**
 * URL of the users/me endpoint
 * @type {string}
 *
 * @version 1.0.0
 * @author [Gobi Ahonon](https://github.com/ahonongobia)
 * @author [Werner Schmid](https://github.com/werner94fribourg)
 */
export const ME_URL = USERS_URL + '/me';

/**
 * URL of the users/forgot-password endpoint
 * @type {string}
 *
 * @version 1.0.0
 * @author [Gobi Ahonon](https://github.com/ahonongobia)
 * @author [Werner Schmid](https://github.com/werner94fribourg)
 */
export const FORGOT_PASSWORD_URL = USERS_URL + '/forgot-password';

/**
 * URL of the users/send-confirmation-email endpoint
 * @type {string}
 *
 * @version 1.0.0
 * @author [Gobi Ahonon](https://github.com/ahonongobia)
 * @author [Werner Schmid](https://github.com/werner94fribourg)
 */
export const SEND_CONFIRMATION_EMAIL_URL =
  USERS_URL + '/send-confirmation-email';

/**
 * URL of the users/confirm-email/:confToken endpoint
 * @type {string}
 *
 * @version 1.0.0
 * @author [Gobi Ahonon](https://github.com/ahonongobia)
 * @author [Werner Schmid](https://github.com/werner94fribourg)
 */
export const CONFIRM_EMAIL_URL = USERS_URL + '/confirm-email/:confToken';

/**
 * URL of the users/change-password endpoint
 * @type {string}
 *
 * @version 1.0.0
 * @author [Gobi Ahonon](https://github.com/ahonongobia)
 * @author [Werner Schmid](https://github.com/werner94fribourg)
 */
export const UPDATE_PASSWORD_URL = USERS_URL + '/change-password';

/**
 * URL of the users/reset-password/:resetToken endpoint
 * @type {string}
 *
 * @version 1.0.0
 * @author [Gobi Ahonon](https://github.com/ahonongobia)
 * @author [Werner Schmid](https://github.com/werner94fribourg)
 */
export const RESET_PASSWORD_URL = USERS_URL + '/reset-password/:resetToken';

/**
 * Base URL of the parking resource in the backend
 * @type {string}
 *
 * @version 1.0.0
 * @author [Gobi Ahonon](https://github.com/ahonongobia)
 * @author [Werner Schmid](https://github.com/werner94fribourg)
 */
export const PARKINGS_URL = API_URL + '/parkings';

/**
 * URL of the parkings/:id endpoint
 * @type {string}
 *
 * @version 1.0.0
 * @author [Gobi Ahonon](https://github.com/ahonongobia)
 * @author [Werner Schmid](https://github.com/werner94fribourg)
 */
export const SINGLE_PARKING_URL = PARKINGS_URL + '/:id';

/**
 * URL of the parkings/:id/validate endpoint
 * @type {string}
 *
 * @version 1.0.0
 * @author [Gobi Ahonon](https://github.com/ahonongobia)
 * @author [Werner Schmid](https://github.com/werner94fribourg)
 */
export const VALIDATE_PARKING_URL = SINGLE_PARKING_URL + '/validate';

/**
 * URL of the parkings/:id/start-reservation endpoint
 * @type {string}
 *
 * @version 1.0.0
 * @author [Gobi Ahonon](https://github.com/ahonongobia)
 * @author [Werner Schmid](https://github.com/werner94fribourg)
 */
export const RESERVE_PARKING_URL = SINGLE_PARKING_URL + '/start-reservation';

/**
 * URL of the parkings/:id/end-reservation endpoint
 * @type {string}
 *
 * @version 1.0.0
 * @author [Gobi Ahonon](https://github.com/ahonongobia)
 * @author [Werner Schmid](https://github.com/werner94fribourg)
 */
export const END_RESERVATION_URL = SINGLE_PARKING_URL + '/end-reservation';

/**
 * URL of the parkings/my-parkings endpoint
 * @type {string}
 *
 * @version 1.0.0
 * @author [Gobi Ahonon](https://github.com/ahonongobia)
 * @author [Werner Schmid](https://github.com/werner94fribourg)
 */
export const OWN_PARKINGS_URL = PARKINGS_URL + '/my-parkings';

/**
 * Base URL of the occupation resource in the backend
 * @type {string}
 *
 * @version 1.0.0
 * @author [Gobi Ahonon](https://github.com/ahonongobia)
 * @author [Werner Schmid](https://github.com/werner94fribourg)
 */
export const OCCUPATIONS_URL = API_URL + '/occupations';

/**
 * URL of the occupations/my-occupations endpoint
 * @type {string}
 *
 * @version 1.0.0
 * @author [Gobi Ahonon](https://github.com/ahonongobia)
 * @author [Werner Schmid](https://github.com/werner94fribourg)
 */
export const OWN_OCCUPATIONS_URL = OCCUPATIONS_URL + '/my-occupations';

/**
 * Base Navigation items data that will be displayed in the navigation bar
 * @type {Object[]}
 *
 * @version 1.0.0
 * @author [Gobi Ahonon](https://github.com/ahonongobia)
 * @author [Werner Schmid](https://github.com/werner94fribourg)
 */
export const NAV_ITEMS = [
  {
    title: 'Home',
    url: '/home',
  },
  {
    title: 'Parkings',
    url: '/parkings',
  },
  {
    title: 'About Us',
    url: '/about-us',
  },
];

/**
 * Side Navigation items data that will be displayed in the side navigation bar of the profile section
 * @type {Object[]}
 *
 * @version 1.0.0
 * @author [Gobi Ahonon](https://github.com/ahonongobia)
 * @author [Werner Schmid](https://github.com/werner94fribourg)
 */
export const PROFILE_NAV_ITEMS = [
  {
    title: 'Profile',
    url: '/profile',
    icon: <AccountCircle />,
    roles: ['client', 'provider', 'admin'],
  },
  {
    title: 'Change Password',
    url: '/profile/password',
    icon: <Key />,
    roles: ['client', 'provider', 'admin'],
  },
  {
    title: 'My parkings',
    url: '/profile/parkings',
    icon: <CarRental />,
    roles: ['provider'],
  },
  {
    title: 'Parking requests',
    url: '/profile/requests',
    icon: <LocalParking />,
    roles: ['admin'],
  },
];

/**
 * Navigation items data that will be displayed in the navigation bar when the user is logged in
 * @type {Object[]}
 *
 * @version 1.0.0
 * @author [Gobi Ahonon](https://github.com/ahonongobia)
 * @author [Werner Schmid](https://github.com/werner94fribourg)
 */
export const LOGGED_ITEMS = [
  {
    title: 'Become a provider',
    url: '/parking-request',
    roles: ['client'],
  },
];

/**
 * Navigation items data that will be displayed in the navigation bar when the user is not logged in
 * @type {Object[]}
 *
 * @version 1.0.0
 * @author [Gobi Ahonon](https://github.com/ahonongobia)
 * @author [Werner Schmid](https://github.com/werner94fribourg)
 */
export const NON_LOGGED_ITEMS = [
  {
    title: 'Signin',
    url: '/signin',
  },
  {
    title: 'Signup',
    url: '/signup',
  },
];

/**
 * Displayed input field datas of the signin form
 * @type {Object[]}
 *
 * @version 1.0.0
 * @author [Gobi Ahonon](https://github.com/ahonongobia)
 * @author [Werner Schmid](https://github.com/werner94fribourg)
 */
export const SIGNIN_FIELDS = [
  {
    id: 'email',
    label: 'Email Address',
    type: 'text',
  },
  {
    id: 'password',
    label: 'Password',
    type: 'password',
  },
];

/**
 * Displayed input field datas of the signup form
 * @type {Object[]}
 *
 * @version 1.0.0
 * @author [Gobi Ahonon](https://github.com/ahonongobia)
 * @author [Werner Schmid](https://github.com/werner94fribourg)
 */
export const SIGNUP_FIELDS = [
  {
    id: 'username',
    label: 'Username',
    type: 'text',
    xs: 12,
    sm: 6,
    hideWithGoogle: false,
  },
  {
    id: 'email',
    label: 'Email',
    type: 'email',
    xs: 12,
    sm: 12,
    hideWithGoogle: true,
  },
  {
    id: 'phone',
    label: 'Phone Number',
    type: 'tel',
    xs: 12,
    sm: 12,
    hideWithGoogle: false,
  },
  {
    id: 'password',
    label: 'Password',
    type: 'password',
    xs: 12,
    sm: 12,
    hideWithGoogle: true,
  },
  {
    id: 'passwordConfirm',
    label: 'Confirm Password',
    type: 'password',
    xs: 12,
    sm: 12,
    hideWithGoogle: true,
  },
];

/**
 * Displayed input field datas of the reset password form
 * @type {Object[]}
 *
 * @version 1.0.0
 * @author [Gobi Ahonon](https://github.com/ahonongobia)
 * @author [Werner Schmid](https://github.com/werner94fribourg)
 */
export const RESET_PASSWORD_FIELDS = [
  {
    id: 'password',
    label: 'Password',
    type: 'password',
    xs: 12,
    sm: 12,
  },
  {
    id: 'passwordConfirm',
    label: 'Confirm Password',
    type: 'password',
    xs: 12,
    sm: 12,
  },
];

/**
 * Displayed input field datas of the new parking form
 * @type {Object[]}
 *
 * @version 1.0.0
 * @author [Gobi Ahonon](https://github.com/ahonongobia)
 * @author [Werner Schmid](https://github.com/werner94fribourg)
 */
export const NEW_PARKING_FIELDS = [
  { id: 'name', label: 'Name', type: 'text' },
  { id: 'description', label: 'Description', type: 'textfield' },
  { id: 'type', label: 'Type', type: 'select', values: ['indoor', 'outdoor'] },
  { id: 'price', label: 'Price', type: 'number' },
  { id: 'address', label: 'Address', type: 'autocomplete' },
  { id: 'photos', label: 'Photos', type: 'file' },
];
