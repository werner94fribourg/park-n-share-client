import LinkContainer from '../components/Signin/LinkContainer/LinkContainer';
import SignInForm from '../components/Signin/SigninForm/SignInForm';
import SignContainer from '../components/UI/SignContainer/SignContainer';

function SignIn() {
  return (
    <SignContainer headerText="Sign In">
      <SignInForm />
      <LinkContainer />
    </SignContainer>
  );
}

export default SignIn;
