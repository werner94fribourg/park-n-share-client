import GoogleLoginButton from '../../UI/GoogleLoginButton/GoogleLoginButton';
import SignLink from '../../UI/SignLink/SignLink';
import { linksWrapper, mainWrapper } from './LinkContainerMUIStyles';
import { Grid } from '@mui/material';

/**
 * LinkContainer component in the Signin page, that wraps the links (Signup and Forgot password) of the page.
 *
 * @version 1.0.0
 * @author [Gobi Ahonon](https://github.com/ahonongobia)
 * @author [Werner Schmid](https://github.com/werner94fribourg)
 */
const LinkContainer = () => {
  return (
    <Grid container style={mainWrapper}>
      <GoogleLoginButton buttonText="Sign in with Google" type="signin" />
      <Grid container style={linksWrapper}>
        <SignLink url="/forgot-password" title="Forgot Password ?" />
        <SignLink url="/signup" title="Don't have an account? Sign Up" />
      </Grid>
    </Grid>
  );
};

LinkContainer.propTypes = {};
export default LinkContainer;
