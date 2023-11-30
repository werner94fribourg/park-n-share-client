import LinkContainer from '../components/Signin/LinkContainer/LinkContainer';
import SignInForm from '../components/Signin/SigninForm/SignInForm';
import SignContainer from '../components/UI/SignContainer/SignContainer';

/**
 * Component representing the SignIn page of the application.
 *
 * @version 1.0.0
 * @author [Gobi Ahonon](https://github.com/ahonongobia)
 * @author [Werner Schmid](https://github.com/werner94fribourg)
 */
function SignIn() {
  return (
    <SignContainer headerText="Sign In">
      <SignInForm />
      <LinkContainer />
    </SignContainer>
  );
}

SignIn.propTypes = {};
export default SignIn;
