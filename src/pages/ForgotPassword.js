import ForgotPasswordForm from '../components/ForgotPassword/ForgotPasswordForm/ForgotPasswordForm';
import LinkContainer from '../components/ForgotPassword/LinkContainer/LinkContainer';
import SignContainer from '../components/UI/SignContainer/SignContainer';

function ForgotPassword() {
  return (
    <SignContainer headerText="Forgot Password">
      <ForgotPasswordForm />
      <LinkContainer />
    </SignContainer>
  );
}

export default ForgotPassword;
