import SignLink from '../../UI/SignLink/SignLink';
import {
  linksWrapper,
  mainWrapper,
  secondaryWrapper,
} from './LinkContainerMUIStyles';
import { Grid } from '@mui/material';
import { GoogleLogin } from 'react-google-login';

const LinkContainer = () => {
  return (
    <Grid style={mainWrapper}>
      <div style={secondaryWrapper}>
        <GoogleLogin
          clientId="YOUR_GOOGLE_CLIENT_ID"
          buttonText="Sign up with Google"
          onSuccess={responseGoogle => {
            console.log(responseGoogle);
          }}
          onFailure={responseGoogle => {
            console.log(responseGoogle);
          }}
          cookiePolicy="single_host_origin"
        />
      </div>
      <Grid container justifyContent="flex-end" style={linksWrapper}>
        <Grid item>
          <SignLink url="/signin" title="Already have an account? Sign in" />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default LinkContainer;
