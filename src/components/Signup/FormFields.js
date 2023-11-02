// FormFields.js component
import { Box, Grid } from '@mui/material';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import React from 'react';
import { GoogleLogin } from 'react-google-login';
import { Link } from 'react-router-dom';

function FormFields({ formData, error, handleInputChange, handleSubmit }) {
  return (
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
            error={!!error.firstName}
            helperText={error.firstName}
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
            error={!!error.lastName}
            helperText={error.lastName}
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
      <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
        Sign Up
      </Button>
      <GoogleLogin
        clientId="YOUR_GOOGLE_CLIENT_ID"
        buttonText="Sign up with Google"
        onSuccess={responseGoogle => {
          console.log(responseGoogle);
        }}
        onFailure={responseGoogle => {
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
  );
}

export default FormFields;
