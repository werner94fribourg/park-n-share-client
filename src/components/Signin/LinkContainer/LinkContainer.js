import SignLink from '../../UI/SignLink/SignLink';
import GoogleLoginButton from '../GoogleLoginButton/GoogleLoginButton';
import { linksWrapper, mainWrapper } from './LinkContainerMUIStyles';
import { Grid } from '@mui/material';

//import { GoogleLogin } from 'react-google-login';
//TODO: Add GoogleLogin component
const LinkContainer = () => {
  return (
    <Grid container style={mainWrapper}>
      <GoogleLoginButton />
      <Grid container style={linksWrapper}>
        <SignLink url="/forgot-password" title="Forgot Password ?" />
        <SignLink url="/signup" title="Don't have an account? Sign Up" />
      </Grid>
    </Grid>
  );
};

export default LinkContainer;
