import { containerStyles } from './GoogleLoginButtonMUIStyles';
import PropTypes from 'prop-types';
import { GoogleLogin } from 'react-google-login';

/**
 * GoogleLoginButton component in the SignUp page, containing the Google Login button.
 *
 * @version 1.0.0
 * @author [Gobi Ahonon](https://github.com/ahonongobia)
 * @author [Werner Schmid](https://github.com/werner94fribourg)
 */
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
GoogleLoginButton.propTypes = {
  /** Text of the Google Login button. */
  buttonText: PropTypes.string,
  /** Function to execute when the Google Login button is clicked. */
  onClick: PropTypes.func,
};
export default GoogleLoginButton;
