import LinkContainer from '../components/Signup/LinkContainer/LinkContainer';
import SignUpForm from '../components/Signup/SignUpForm/SignUpForm';
import SignContainer from '../components/UI/SignContainer/SignContainer';

// import { GoogleLogin } from 'react-google-login';
// import global-styles.css

function SignUp() {
  return (
    <SignContainer headerText="Sign Up">
      <SignUpForm />
      <LinkContainer />
    </SignContainer>
  );
}

export default SignUp;
