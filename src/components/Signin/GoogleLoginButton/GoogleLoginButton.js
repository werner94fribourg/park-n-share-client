import { containerStyles } from './GoogleLoginButtonMUIStyles';
import { GoogleLogin } from 'react-google-login';

function GoogleLoginButton() {
  return (
    <div style={containerStyles}>
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
      />
    </div>
  );
}

export default GoogleLoginButton;
