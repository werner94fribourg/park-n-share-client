export const BACKEND_URL = 'http://localhost:3001';

export const API_URL = `${BACKEND_URL}/api/v1`;

export const USERS_URL = API_URL + '/users';

export const SIGNIN_URL = USERS_URL + '/signin';

export const PIN_EXPIRATION_URL = USERS_URL + '/:email/pin-expiration';

export const CONFIRM_PIN_URL = USERS_URL + '/confirm-pin';
