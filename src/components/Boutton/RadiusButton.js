import Button from '@mui/material/Button';
import React from 'react'
import { Link } from 'react-router-dom';

export default function RadiusButton({text, url}) {
  const buttonStyle = {
    fontSize: '24px',
    borderRadius: '50px',
    '&:hover': {
      boxShadow: '0px 0px 15px rgba(0, 0, 0, 0.2)',
    },
  };
  return (
    <Button component={Link} to={url} variant="contained" color="primary" size="large" sx={buttonStyle} style={{ margin: '0 10px' }}>
        {text}
    </Button>
  )
}
