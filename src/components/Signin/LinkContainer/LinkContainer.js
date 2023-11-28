import GoogleLoginButton from '../../UI/GoogleLoginButton/GoogleLoginButton';
import SignLink from '../../UI/SignLink/SignLink';
import { linksWrapper, mainWrapper } from './LinkContainerMUIStyles';
import { Grid } from '@mui/material';

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

export default LinkContainer;
