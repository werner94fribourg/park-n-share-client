import SignUpForm from '../components/Signup/SignUpForm';
import Typographys from '../components/Signup/Typographys';
// import { GoogleLogin } from 'react-google-login';
// import global-styles.css
import '../styles/global-styles.css';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import * as React from 'react';

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
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
    });

    // Perform form validation here
    let hasError = false;

    if (!formData.firstName) {
      setError(prevError => ({
        ...prevError,
        firstName: 'First name is required',
      }));
      hasError = true;
    }

    if (!formData.lastName) {
      setError(prevError => ({
        ...prevError,
        lastName: 'Last name is required',
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

    if (formData.password !== formData.confirmPassword) {
      setError(prevError => ({
        ...prevError,
        confirmPassword: 'Passwords do not match',
      }));
      hasError = true;
    }

    if (hasError) {
      return;
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
          <SignUpForm
            formData={formData}
            error={error}
            handleInputChange={handleInputChange}
            handleSubmit={handleSubmit}
          />
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default SignUp;
