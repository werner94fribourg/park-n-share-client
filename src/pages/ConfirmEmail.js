import { notifyError, notifySuccess } from '../store/slices/notification';
import { confirmEmail } from '../utils/api';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router';

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

export default ConfirmEmail;
