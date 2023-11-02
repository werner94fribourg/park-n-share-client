import { Typography } from '@mui/material';
import React from 'react';

function ErrorDisplay({ error }) {
  return error ? (
    <Typography variant="body2" color="error" sx={{ fontSize: '20px' }}>
      {error}
    </Typography>
  ) : null;
}

export default ErrorDisplay;
