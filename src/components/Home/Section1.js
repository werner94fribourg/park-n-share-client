import RadiusButton from '../Button/RadiusButton';
import Box from '@mui/material/Box';
import React from 'react';

const ButtonGroup = () => {
  return (
    <Box display="flex" justifyContent="center" mt={2} mb={3}>
      <RadiusButton text="Free Parking" url="/parking" />
      <RadiusButton text="Sign Up" url="/signup" />
      <RadiusButton text="Sign In" url="/signin" />
    </Box>
  );
};

export default ButtonGroup;
