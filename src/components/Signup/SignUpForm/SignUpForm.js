// SignUpForm.js component
import { createAccount } from '../../../store/slices/auth';
import { notifyError } from '../../../store/slices/notification';
import { SIGNUP_FIELDS } from '../../../utils/globals';
import { invalidFieldsReducer, userReducers } from '../../../utils/utils';
import FormField from '../FormField/FormField';
import { formStyles, signupButtonStyles } from './SignUpFormMUIStyles';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { useEffect, useReducer } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';

/**
 * SignUpForm component in the SignUp page, containing the form for signing up a user.
 *
 * @version 1.0.0
 * @author [Gobi Ahonon](https://github.com/ahonongobia)
 * @author [Werner Schmid](https://github.com/werner94fribourg)
 */
function SignUpForm() {
  const { isGoogleAuth, googleID } = useSelector(state => state.auth);
  const [typedUser, dispatchUser] = useReducer(userReducers, undefined);
  const [messages, dispatchMessages] = useReducer(
    invalidFieldsReducer,
    undefined,
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

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

    if (isGoogleAuth) {
      console.log('google auth');
      console.log(typedUser);
      const { username, phone } = typedUser;
      console.log({ googleID, username, phone });
      return;
    }

    // Perform form validation here
    const { valid, message, fields } = await createAccount(typedUser, dispatch);

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

    navigate('/otp');
  };

  console.log(googleID);
  console.log(isGoogleAuth);
  const signupFields = !isGoogleAuth
    ? SIGNUP_FIELDS
    : SIGNUP_FIELDS.filter(field => !field.hideWithGoogle);

  return (
    <Box component="form" noValidate onSubmit={handleSubmit} sx={formStyles}>
      {signupFields.map(field => (
        <FormField
          key={field.id}
          id={field.id}
          label={field.label}
          value={typedUser ? typedUser[field.id] : ''}
          onChange={handleInputChange.bind(null, field.id)}
          type={field.type}
          xs={field.xs}
          sm={field.sm}
          error={messages ? messages[field.id] !== '' : false}
          helperText={messages ? messages[field.id] : ''}
        />
      ))}
      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={signupButtonStyles}
      >
        Sign Up
      </Button>
    </Box>
  );
}

SignUpForm.propTypes = {};
export default SignUpForm;
