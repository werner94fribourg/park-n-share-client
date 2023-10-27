// SignUpForm.js component
import React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import FormFields from './FormFields';

function SignUpForm({ formData, error, handleInputChange, handleSubmit }) {
  return (
    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
      <Grid container spacing={2}>
        <FormFields
          formData={formData}
          error={error}
          handleInputChange={handleInputChange}
          handleSubmit={handleSubmit}
        />
      </Grid>
    </Box>
  );
}

export default SignUpForm;
