import ResetPasswordContainer from '../components/ResetPassword/ResetPasswordContainer/ResetPasswordContainer';
import ResetPasswordForm from '../components/ResetPassword/ResetPasswordForm/ResetPasswordForm';

/**
 * Component representing the Reset Password page of the application.
 *
 * @version 1.0.0
 * @author [Gobi Ahonon](https://github.com/ahonongobia)
 * @author [Werner Schmid](https://github.com/werner94fribourg)
 */
const ResetPassword = () => {
  return (
    <ResetPasswordContainer>
      <ResetPasswordForm />
    </ResetPasswordContainer>
  );
};

ResetPassword.propTypes = {};
export default ResetPassword;
