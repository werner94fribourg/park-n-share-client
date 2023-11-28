import { containerStyles } from './GoogleLoginButtonMUIStyles';
import { GoogleLogin } from 'react-google-login';

function GoogleLoginButton(props) {
  const { buttonText, onClick } = props;

  return (
    <div style={containerStyles} onClick={onClick}>
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          backgroundColor: 'transparent',
          zIndex: 1000,
          cursor: 'pointer',
        }}
      ></div>
      <GoogleLogin
        clientId="YOUR_GOOGLE_CLIENT_ID"
        buttonText={buttonText}
        cookiePolicy="single_host_origin"
      />
    </div>
  );
}

export default GoogleLoginButton;
