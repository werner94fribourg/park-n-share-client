import { AccountCircle, CarRental, Key } from '@mui/icons-material';

export const BACKEND_URL = 'http://localhost:3001';

export const GEOAPI_URL = 'https://api.geoapify.com/v1/geocode';

export const GEOAPI_AUTOCOMPLETE_URL = GEOAPI_URL + '/autocomplete';

export const API_URL = `${BACKEND_URL}/api/v1`;

export const USERS_URL = API_URL + '/users';

export const SIGNIN_URL = USERS_URL + '/signin';

export const SIGNUP_URL = USERS_URL + '/signup';

export const PIN_EXPIRATION_URL = USERS_URL + '/:email/pin-expiration';

export const CONFIRM_PIN_URL = USERS_URL + '/confirm-pin';

export const ME_URL = USERS_URL + '/me';

export const FORGOT_PASSWORD_URL = USERS_URL + '/forgot-password';

export const SEND_CONFIRMATION_EMAIL_URL =
  USERS_URL + '/send-confirmation-email';

export const CONFIRM_EMAIL_URL = USERS_URL + '/confirm-email/:confToken';

export const UPDATE_PASSWORD_URL = USERS_URL + '/change-password';

export const RESET_PASSWORD_URL = USERS_URL + '/reset-password/:resetToken';

export const PARKINGS_URL = API_URL + '/parkings';

export const SINGLE_PARKING_URL = PARKINGS_URL + '/:id';

export const OWN_PARKINGS_URL = PARKINGS_URL + '/my-parkings';

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

export const PROFILE_NAV_ITEMS = [
  {
    title: 'Profile',
    url: '/profile',
    icon: <AccountCircle />,
    roles: ['client', 'provider'],
  },
  {
    title: 'Change Password',
    url: '/profile/password',
    icon: <Key />,
    roles: ['client', 'provider'],
  },
  {
    title: 'My parkings',
    url: '/profile/parkings',
    icon: <CarRental />,
    roles: ['provider'],
  },
];

export const LOGGED_ITEMS = [
  {
    title: 'Become a provider',
    url: '/parking-request',
    roles: ['client'],
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

export const NEW_PARKING_FIELDS = [
  { id: 'name', label: 'Name', type: 'text' },
  { id: 'description', label: 'Description', type: 'textfield' },
  { id: 'type', label: 'Type', type: 'select', values: ['indoor', 'outdoor'] },
  { id: 'price', label: 'Price', type: 'number' },
  { id: 'address', label: 'Address', type: 'autocomplete' },
  { id: 'photos', label: 'Photos', type: 'file' },
];
