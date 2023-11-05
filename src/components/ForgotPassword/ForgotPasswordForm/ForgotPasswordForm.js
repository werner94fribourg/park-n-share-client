import SignInputField from '../../UI/SignInputField/SignInputField';
import { boxStyles, buttonStyles } from './ForgotPasswordFormMUIStyles';
import { Box, Button } from '@mui/material';
import { useState } from 'react';

// TODO: handle password. Backend task
const ForgotPasswordForm = () => {
  const [email, setEmail] = useState('');

  const emailChangeHandler = event => {
    setEmail(event.target.value);
  };

  const handleSubmit = event => {
    event.preventDefault();
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
      <Button type="submit" fullWidth variant="contained" sx={buttonStyles}>
        Send Reset Link
      </Button>
    </Box>
  );
};

export default ForgotPasswordForm;
