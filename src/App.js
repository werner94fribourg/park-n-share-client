import Theme from './components/Theme/Theme';
import AppRouter from './routers/AppRouter';
import { getPinValidity, initialize, updateTimeout } from './store/slices/auth';
import { getMe } from './store/slices/users';
import mapboxgl from 'mapbox-gl';
// eslint-disable-line import/no-webpack-loader-syntax
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN;

function App() {
  const {
    auth: { jwt },
    users: { loading },
  } = useSelector(state => state);
  const { pinExpirationDate, correctCredentials } = useSelector(
    state => state.auth,
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const setup = async () => {
      const token = jwt || localStorage.getItem('jwt');
      if (await getMe(token, dispatch)) initialize(token, dispatch);
      else localStorage.removeItem('jwt');
    };

    setup();
  }, [jwt, dispatch]);

  useEffect(() => {
    const email = localStorage.getItem('email');
    if (!correctCredentials && email) {
      getPinValidity(email, dispatch);
      navigate('/otp');
    }
    if (pinExpirationDate !== '') {
      updateTimeout(pinExpirationDate, dispatch);
      navigate('/otp');
    }
  }, [dispatch, pinExpirationDate, correctCredentials, navigate]);

  if ((!correctCredentials && localStorage.getItem('email')) || loading)
    return <div></div>;

  return (
    <Theme>
      <AppRouter />
    </Theme>
  );
}
App.propTypes = {};

export default App;
