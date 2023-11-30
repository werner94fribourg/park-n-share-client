import OtpContainer from '../components/Otp/OtpContainer/OtpContainer';
import OtpForm from '../components/Otp/OtpForm/OtpForm';

/**
 * Component representing the Otp page of the application
 *
 * @version 1.0.0
 * @author [Gobi Ahonon](https://github.com/ahonongobia)
 * @author [Werner Schmid](https://github.com/werner94fribourg)
 */
const Otp = () => {
  return (
    <OtpContainer>
      <OtpForm />
    </OtpContainer>
  );
};

Otp.propTypes = {};
export default Otp;
