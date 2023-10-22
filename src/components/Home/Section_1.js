import React from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { Link } from 'react-router-dom';

const ButtonGroup = () => {
  const buttonStyle = {
    fontSize: '24px',
    borderRadius: '50px',
    '&:hover': {
      boxShadow: '0px 0px 15px rgba(0, 0, 0, 0.2)',
    },
  };

  return (
    <Box display="flex" justifyContent="center" mt={2} mb={3}>
       <Button variant="contained" color="primary" size="large" sx={buttonStyle} style={{ margin: '0 10px' }}>
        Free Parking
      </Button>
      
      <Button component={Link} to="/signup" variant="contained" color="primary" size="large" sx={buttonStyle} style={{ margin: '0 10px' }}>
        Sign Up
      </Button>
      <Button component={Link} to="/signin" variant="contained" color="primary" size="large" sx={buttonStyle} style={{ margin: '0 10px' }}>
        Sign In
      </Button>
    </Box>
  );
};

export default ButtonGroup;
