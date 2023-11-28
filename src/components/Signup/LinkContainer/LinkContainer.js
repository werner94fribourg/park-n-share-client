import { resetSessionID, setGoogleID } from '../../../store/slices/auth';
import { notifyError, notifySuccess } from '../../../store/slices/notification';
import { getSignupLink } from '../../../utils/api';
import { disconnectSocket } from '../../../utils/utils';
import { setSocket } from '../../../utils/utils';
import GoogleLoginButton from '../../UI/GoogleLoginButton/GoogleLoginButton';
import SignLink from '../../UI/SignLink/SignLink';
import {
  linksWrapper,
  mainWrapper,
  secondaryWrapper,
} from './LinkContainerMUIStyles';
import { Grid } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

const LinkContainer = () => {
  const dispatch = useDispatch();
  const { isGoogleAuth } = useSelector(state => state.auth);

  const googleLoginClickHandler = e => {
    const socket = setSocket();

    socket.on('connexion_established', async data => {
      const { sessionID } = data;

      const { valid, url, message } = await getSignupLink(sessionID);

      if (!valid) {
        notifyError(message, dispatch);
        return;
      }

      window.open(url, '_blank', 'width=600,height=400');
    });

    socket.on('signed_up', user => {
      setGoogleID(user.id, dispatch);

      notifySuccess(
        'You successfully logged in. Complete your username and phone number to finish the signup process.',
        dispatch,
      );

      resetSessionID(dispatch);
      disconnectSocket(socket);
    });

    socket.on('signup_error', data => {
      const { message } = data;

      notifyError(message, data);
      resetSessionID(dispatch);
      disconnectSocket(socket);
    });

    e.stopPropagation();
  };

  return (
    <Grid style={mainWrapper}>
      {!isGoogleAuth && (
        <div style={secondaryWrapper}>
          <GoogleLoginButton
            buttonText="Sign up with Google"
            type="signup"
            onClick={googleLoginClickHandler}
          />
        </div>
      )}
      <Grid container justifyContent="flex-end" style={linksWrapper}>
        <Grid item>
          <SignLink url="/signin" title="Already have an account? Sign in" />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default LinkContainer;
