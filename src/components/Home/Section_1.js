import React from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { Link } from 'react-router-dom';
import RadiusButton from '../Boutton/RadiusButton';

const ButtonGroup = () => {

  return (
    <Box display="flex" justifyContent="center" mt={2} mb={3}>
      <RadiusButton  text="Free Parking" url="/parking" /> 
      <RadiusButton text="Sign Up" url="/signup" /> 
      <RadiusButton text="Sign In" url="/signin" /> 

    </Box>
  );
};

export default ButtonGroup;
