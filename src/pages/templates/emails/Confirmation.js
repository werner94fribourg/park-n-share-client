import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import React from 'react';

const RegistrationSuccess = () => {
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          marginTop: '100px',
        }}
      >
        <Avatar
          sx={{ m: 1, bgcolor: 'success.main', width: '80px', height: '80px' }}
        >
          <CheckCircleOutlineIcon sx={{ fontSize: '3rem' }} />
        </Avatar>
        <Typography component="h1" variant="h5">
          Registration Successful
        </Typography>
        <Typography
          variant="body2"
          color="textSecondary"
          style={{ marginTop: '20px', fontSize: 18 }}
        >
          Thank you for registering. Your account has been successfully created.
          To be able to book a parking,Please confirm yoour email address by
          cliking the link sent to you.
        </Typography>
        <Button
          type="button"
          fullWidth
          variant="contained"
          color="primary"
          style={{ margin: '20px 0', fontSize: 15 }}
          href="/signin" // Replace with the path to your sign-in page
        >
          Sign In
        </Button>
      </div>
    </Container>
  );
};

export default RegistrationSuccess;
