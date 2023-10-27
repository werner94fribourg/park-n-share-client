import React from 'react';
import { GoogleLogin } from 'react-google-login';

function GoogleLoginButton() {
  return (
    <GoogleLogin
      clientId="YOUR_GOOGLE_CLIENT_ID"
      buttonText="Sign in with Google"
      onSuccess={responseGoogle => {
        console.log(responseGoogle);
      }}
      onFailure={responseGoogle => {
        console.log(responseGoogle);
      }}
      cookiePolicy="single_host_origin"
      fullWidth
      style={{ marginTop: '10px' }}
    />
  );
}

export default GoogleLoginButton;