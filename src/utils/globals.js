export const BACKEND_URL = 'http://localhost:3001';

export const API_URL = `${BACKEND_URL}/api/v1`;

export const USERS_URL = API_URL + '/users';

export const SIGNIN_URL = USERS_URL + '/signin';

export const SIGNUP_URL = USERS_URL + '/signup';

export const PIN_EXPIRATION_URL = USERS_URL + '/:email/pin-expiration';

export const CONFIRM_PIN_URL = USERS_URL + '/confirm-pin';

export const ME_URL = USERS_URL + '/me';

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

export const LOGGED_ITEMS = [
  {
    title: 'Become a provider',
    url: '/provider',
  },
];

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

export const SIGNUP_FIELDS = [
  {
    id: 'username',
    label: 'Username',
    type: 'text',
    xs: 12,
    sm: 6,
  },
  {
    id: 'email',
    label: 'Email',
    type: 'email',
    xs: 12,
    sm: 12,
  },
  {
    id: 'phone',
    label: 'Phone Number',
    type: 'tel',
    xs: 12,
    sm: 12,
  },
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
