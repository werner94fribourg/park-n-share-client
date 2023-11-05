// SignUpForm.js component
import { SIGNUP_FIELDS } from '../../../utils/globals';
import FormField from '../FormField/FormField';
import {
  errorStyles,
  formStyles,
  signupButtonStyles,
} from './SignUpFormMUIStyles';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useState } from 'react';

function SignUpForm() {
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    phone: '',
    password: '',
    passwordConfirm: '',
  });

  const [error, setError] = useState({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    passwordConfirm: '',
  });

  const handleInputChange = e => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async event => {
    event.preventDefault();
    setError({
      firstname: '',
      lastname: '',
      email: '',
      password: '',
      passwordConfirm: '',
    });

    // Perform form validation here
    let hasError = false;

    if (!formData.firstname) {
      setError(prevError => ({
        ...prevError,
        firstname: 'First name is required',
      }));
      hasError = true;
    }

    if (!formData.lastname) {
      setError(prevError => ({
        ...prevError,
        lastname: 'Last name is required',
      }));
      hasError = true;
    }

    if (!formData.email) {
      setError(prevError => ({ ...prevError, email: 'Email is required' }));
      hasError = true;
    }

    if (!formData.password) {
      setError(prevError => ({
        ...prevError,
        password: 'Password is required',
      }));
      hasError = true;
    }

    if (formData.password !== formData.passwordConfirm) {
      setError(prevError => ({
        ...prevError,
        passwordConfirm: 'Passwords do not match',
      }));
      hasError = true;
    }

    if (hasError) {
      return;
    }
  };
  return (
    <Box component="form" noValidate onSubmit={handleSubmit} sx={formStyles}>
      {SIGNUP_FIELDS.map(field => (
        <FormField
          key={field.id}
          id={field.id}
          label={field.label}
          value={formData[field.id]}
          onChange={handleInputChange}
          type={field.type}
          xs={field.xs}
          sm={field.sm}
        />
      ))}
      {error.general && (
        <Typography variant="body2" color="error" sx={errorStyles}>
          {error.general}
        </Typography>
      )}
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
