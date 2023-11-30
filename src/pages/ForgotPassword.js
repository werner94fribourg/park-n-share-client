import ForgotPasswordForm from '../components/ForgotPassword/ForgotPasswordForm/ForgotPasswordForm';
import LinkContainer from '../components/ForgotPassword/LinkContainer/LinkContainer';
import SignContainer from '../components/UI/SignContainer/SignContainer';

/**
 * Component representing the Forgot Password page of the application.
 *
 * @version 1.0.0
 * @author [Gobi Ahonon](https://github.com/ahonongobia)
 * @author [Werner Schmid](https://github.com/werner94fribourg)
 */
function ForgotPassword() {
  return (
    <SignContainer headerText="Forgot Password">
      <ForgotPasswordForm />
      <LinkContainer />
    </SignContainer>
  );
}

ForgotPassword.propTypes = {};
export default ForgotPassword;
