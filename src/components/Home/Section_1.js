import React from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

const ButtonGroup = () => {
  const buttonStyle = {
    fontSize: '24px', // Augmente la taille du texte
    borderRadius: '50px', // Arrondit les boutons
  };

  return (
    <Box display="flex" justifyContent="center" mt={2} mb={3}>
      <Button variant="contained" color="primary" size="large" sx={buttonStyle} style={{ margin: '0 10px' }}>
        Free Parking
      </Button>
      <Button variant="contained" color="primary" size="large" sx={buttonStyle} style={{ margin: '0 10px' }}>
        Sign Up
      </Button>
      <Button variant="contained" color="primary" size="large" sx={buttonStyle} style={{ margin: '0 10px' }}>
        Sign In
      </Button>
    </Box>
  );
};

export default ButtonGroup;
