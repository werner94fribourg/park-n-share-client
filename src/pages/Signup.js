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
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                  value={formData.firstName}
                  onChange={handleInputChange}
                  //error={!!error.firstName}
                  //helperText={error.firstName}
                />
                <Typography
                  variant="body2"
                  color="error"
                  sx={{
                    fontSize: error.firstName ? '15px' : '14px',
                  }}
                >
                  {error.firstName}
                </Typography>

              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  //error={!!error.lastName}
                  //helperText={error.lastName}
                />

                 <Typography
                  variant="body3"
                  color="error"
                  sx={{
                    fontSize: error.lastName ? '15px' : '14px',
                  }}
                >
                {error.lastName}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  error={!!error.email}
                  helperText={error.email}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="telephone"
                  label="Phone Number"
                  type="number"
                  id="telephone"
                  autoComplete="tel"
                  value={formData.telephone}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  value={formData.password}
                  onChange={handleInputChange}
                  error={!!error.password}
                  helperText={error.password}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="confirmPassword"
                  label="Password Confirmation"
                  type="password"
                  id="confirmPassword"
                  autoComplete="new-password"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  error={!!error.confirmPassword}
                  helperText={error.confirmPassword}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="allowExtraEmails" color="primary" />}
                  label="I want to receive inspiration, marketing promotions, and updates via email."
                />
              </Grid>
            </Grid>
            {error.general && (
              <Typography variant="body2" color="error" sx={{ fontSize: '20px' }}>
                {error.general}
              </Typography>
            )}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <GoogleLogin
              clientId="YOUR_GOOGLE_CLIENT_ID"
              buttonText="Sign up with Google"
              onSuccess={(responseGoogle) => {
                console.log(responseGoogle);
              }}
              onFailure={(responseGoogle) => {
                console.log(responseGoogle);
              }}
              cookiePolicy="single_host_origin"
              style={{ width: '100% !important' }} // Set the width to 100%
              fullWidth
            />
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link to={'/signin'} variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default SignUp;
