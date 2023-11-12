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
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';

function SignUpForm() {
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
  return (
    <Box component="form" noValidate onSubmit={handleSubmit} sx={formStyles}>
      {SIGNUP_FIELDS.map(field => (
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

export default SignUpForm;
