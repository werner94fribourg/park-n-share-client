import { notify } from '../../../store/slices/notification';
import { sendForgotPassword } from '../../../utils/api';
import { errorStyles } from '../../Signup/SignUpForm/SignUpFormMUIStyles';
import SignInputField from '../../UI/SignInputField/SignInputField';
import { boxStyles, buttonStyles } from './ForgotPasswordFormMUIStyles';
import { Box, Button, Typography } from '@mui/material';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';

const ForgotPasswordForm = () => {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error, setError] = useState('');

  const emailChangeHandler = event => {
    setEmail(event.target.value);
  };

  const handleSubmit = async event => {
    event.preventDefault();
    const data = await sendForgotPassword(email);

    if (data.valid) {
      navigate('/');
      notify(data.message, dispatch);
      return;
    }
    setError(data.message);

    // Add your password reset logic here
    // Redirect to a confirmation page or display a message
  };
  return (
    <Box component="form" noValidate onSubmit={handleSubmit} sx={boxStyles}>
      <SignInputField
        id="email"
        label="Email Address"
        value={email}
        onChange={emailChangeHandler}
        type="email"
      />
      {error && (
        <Typography variant="body2" color="error" sx={errorStyles}>
          {error}
        </Typography>
      )}
      <Button type="submit" fullWidth variant="contained" sx={buttonStyles}>
        Send Reset Link
      </Button>
    </Box>
  );
};

export default ForgotPasswordForm;
