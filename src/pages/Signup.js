import * as React from 'react';
import { Link } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { GoogleLogin } from 'react-google-login';
// import global-styles.css
import '../styles/global-styles.css';
import SignUpForm from '../components/Signup/SignUpForm';
import Typographys from '../components/Signup/Typographys';

function SignUp() {
  const [formData, setFormData] = React.useState({
    firstName: '',
    lastName: '',
    email: '',
    telephone: '',
    password: '',
    confirmPassword: '',
  });

  const [error, setError] = React.useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError({ firstName: '', lastName: '', email: '', password: '', confirmPassword: '' });

    // Perform form validation here
    let hasError = false;

    if (!formData.firstName) {
      setError((prevError) => ({ ...prevError, firstName: 'First name is required' }));
      hasError = true;
    }

    if (!formData.lastName) {
      setError((prevError) => ({ ...prevError, lastName: 'Last name is required' }));
      hasError = true;
    }

    if (!formData.email) {
      setError((prevError) => ({ ...prevError, email: 'Email is required' }));
      hasError = true;
    }

    if (!formData.password) {
      setError((prevError) => ({ ...prevError, password: 'Password is required' }));
      hasError = true;
    }

    if (formData.password !== formData.confirmPassword) {
      setError((prevError) => ({ ...prevError, confirmPassword: 'Passwords do not match' }));
      hasError = true;
    }

    if (hasError) {
      return;
    }

    try {
      // Send a POST request to sign-up API endpoint
      const response = await fetch('http://localhost:8080/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // Successful sign-up, redirect to OTP page
        window.location.href = '/otp';
      } else {
        const data = await response.json();
        // TODO: Handle API error messages here
        // Example: setError({ email: 'Email already exists' });
      }
    } catch (error) {
      setError({ ...error, general: 'An error occurred while signing up.' });
    }
  };

  return (
    <ThemeProvider theme={createTheme()}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typographys text="Sign Up" />
          <SignUpForm formData={formData} error={error} handleInputChange={handleInputChange} handleSubmit={handleSubmit} />
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default SignUp;
