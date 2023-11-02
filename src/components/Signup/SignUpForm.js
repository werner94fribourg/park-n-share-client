// SignUpForm.js component
import FormFields from './FormFields';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import React from 'react';

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
