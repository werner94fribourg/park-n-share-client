import { notifyError, notifySuccess } from '../store/slices/notification';
import { confirmEmail } from '../utils/api';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router';

/**
 * Component representing the ConfirmEmail Link of the application.
 *
 * @version 1.0.0
 * @author [Gobi Ahonon](https://github.com/ahonongobia)
 * @author [Werner Schmid](https://github.com/werner94fribourg)
 */
const ConfirmEmail = () => {
  const { confToken } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const sendEmailConfirmation = async () => {
      const { valid, message } = await confirmEmail(confToken);

      if (valid) {
        notifySuccess(message, dispatch);
      } else notifyError(message, dispatch);

      navigate('/');
    };

    sendEmailConfirmation();
  }, [confToken, dispatch, navigate]);

  return <div></div>;
};
ConfirmEmail.propTypes = {};
export default ConfirmEmail;
