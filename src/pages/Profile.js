import CustomTextField from '../components/General/Input';
import { Box, Button, Grid, Typography } from '@mui/material';
import React from 'react';

const Profile = () => {
  return (
    <Box display="flex" justifyContent="center" p={10}>
      <Grid container spacing={4} sx={{ maxWidth: '800px' }}>
        <Grid item xs={6}>
          <Box p={2} sx={{ borderRight: '1px solid #ccc' }}>
            <Box display="flex" flexDirection="column" alignItems="center">
              <CustomTextField
                label="First Name"
                name="firstname"
                autoComplete="firstname"
                autoFocus
              />
              <CustomTextField
                label="Last Name"
                name="lastname"
                autoComplete="lastname"
                autoFocus
              />
              <CustomTextField
                label="Email"
                name="email"
                autoComplete="email"
              />
              <CustomTextField
                label="Phone"
                name="telephon"
                autoComplete="Phone"
              />
              <CustomTextField
                label="Password"
                type="password"
                name="password"
                autoComplete="Password"
              />
              <Button variant="contained" color="primary" sx={{ mt: 2 }}>
                Update Profile
              </Button>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={1}></Grid>
        <Grid item xs={5}>
          <Box p={8}>
            <Typography variant="h6" sx={{ color: 'red' }}>
              Your E-mail is not verified
            </Typography>
            <Button variant="contained" color="secondary" sx={{ mt: 2 }}>
              Send Email Verification Link
            </Button>
          </Box>
        </Grid>
        <Grid item xs={3} />
        <Grid item xs={6}>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            flexDirection="column"
          >
            <img
              src="https://i.postimg.cc/mDzczTMr/personnage-de-dessin-anime-personnel-de-bureau-masculin-un-homme-dans-une-chemise-avec-une-cravate-b.jpg"
              alt="Profile"
              style={{ width: '200px', height: '200px', borderRadius: '50%' }}
            />
            <Typography align="center">Gobi Abyssinie</Typography>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Profile;
