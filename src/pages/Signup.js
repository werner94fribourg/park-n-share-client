import LinkContainer from '../components/Signup/LinkContainer/LinkContainer';
import SignUpForm from '../components/Signup/SignUpForm/SignUpForm';
import SignContainer from '../components/UI/SignContainer/SignContainer';

/**
 * Component representing the SignUp page of the application.
 *
 * @version 1.0.0
 * @author [Gobi Ahonon](https://github.com/ahonongobia)
 * @author [Werner Schmid](https://github.com/werner94fribourg)
 */
function SignUp() {
  return (
    <SignContainer headerText="Sign Up">
      <SignUpForm />
      <LinkContainer />
    </SignContainer>
  );
}

SignUp.propTypes = {};
export default SignUp;
