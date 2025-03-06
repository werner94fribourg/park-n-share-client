import GoogleLoginButton from '../../UI/GoogleLoginButton/GoogleLoginButton';
import SignLink from '../../UI/SignLink/SignLink';
import {
  linksWrapper,
  mainWrapper,
  secondaryWrapper,
} from './LinkContainerMUIStyles';
import { Grid } from '@mui/material';
import { useSelector } from 'react-redux';

/**
 * LinkContainer component in the Signup page, that wraps the links (SignIn) of the page.
 *
 * @version 1.0.0
 * @author [Gobi Ahonon](https://github.com/ahonongobia)
 * @author [Werner Schmid](https://github.com/werner94fribourg)
 */
const LinkContainer = () => {
  const { isGoogleAuth } = useSelector(state => state.auth);

  const googleLoginClickHandler = e => {
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

LinkContainer.propTypes = {};
export default LinkContainer;
