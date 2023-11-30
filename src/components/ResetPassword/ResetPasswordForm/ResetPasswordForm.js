import { initialize, setResetLinkValidity } from '../../../store/slices/auth';
import { notifyError, notifySuccess } from '../../../store/slices/notification';
import { getResetLinkValidity, resetPassword } from '../../../utils/api';
import { RESET_PASSWORD_FIELDS } from '../../../utils/globals';
import { invalidFieldsReducer, userReducers } from '../../../utils/utils';
import SignInputField from '../../UI/SignInputField/SignInputField';
import { buttonStyles } from './ResetPasswordFormMUIStyles';
import { Box, Button } from '@mui/material';
import { useEffect, useReducer } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router';

/**
 * ResetPasswordForm component in the ResetPassword page, containing the form for resetting the password of a user.
 *
 * @version 1.0.0
 * @author [Gobi Ahonon](https://github.com/ahonongobia)
 * @author [Werner Schmid](https://github.com/werner94fribourg)
 */
const ResetPasswordForm = () => {
  const { resetToken } = useParams();
  const [typedUser, dispatchUser] = useReducer(userReducers, undefined);
  const [messages, dispatchMessages] = useReducer(
    invalidFieldsReducer,
    undefined,
  );
  const { isResetLinkValid } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const getValidityLink = async () => {
      const { valid, validity } = await getResetLinkValidity(resetToken);

      if (!valid || !validity) {
        navigate('/');
        return;
      }

      setResetLinkValidity(validity, dispatch);
    };

    getValidityLink();
  }, [resetToken, navigate, dispatch]);

  useEffect(() => {
    dispatchUser({ type: 'init' });
    dispatchMessages({ type: 'init' });
  }, []);

  const handleInputChange = (type, e) => {
    if (messages[type]) dispatchUser({ type: `reset_${type}` });
    dispatchUser({ type, payload: e.target.value });
  };

  const handleSubmit = async event => {
    event.preventDefault();
    dispatchMessages({ type: 'reset_all' });

    const { password, passwordConfirm } = typedUser;

    const { valid, message, token, fields } = await resetPassword(resetToken, {
      password,
      passwordConfirm,
    });

    if (!fields && !valid) {
      notifyError(message, dispatch);
      return;
    }

    if (fields && fields.length > 0) {
      fields.forEach(field => {
        const [[key, value]] = Object.entries(field);
        dispatchMessages({ type: key, payload: value });
      });
      return;
    }

    initialize(token, dispatch);
    notifySuccess(message, dispatch);
    navigate('/profile');
    setResetLinkValidity(false, dispatch);
  };

  if (!isResetLinkValid) return <div></div>;

  return (
    <Box component="form" noValidate onSubmit={handleSubmit}>
      {RESET_PASSWORD_FIELDS.map(field => (
        <SignInputField
          key={field.id}
          id={field.id}
          label={field.label}
          value={typedUser ? typedUser[field.id] : ''}
          onChange={handleInputChange.bind(null, field.id)}
          type={field.type}
          error={messages ? messages[field.id] !== '' : false}
          helperText={messages ? messages[field.id] : ''}
        />
      ))}
      <Button type="submit" fullWidth variant="contained" sx={buttonStyles}>
        Reset password
      </Button>
    </Box>
  );
};

ResetPasswordForm.propTypes = {};
export default ResetPasswordForm;
