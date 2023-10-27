import React from 'react';
import TextField from '@mui/material/TextField';

function FormField({ name, label, type, value, onChange, error, helperText }) {
  return (
    <Grid item xs={12}>
      <TextField
        required
        fullWidth
        name={name}
        label={label}
        type={type}
        value={value}
        onChange={onChange}
        error={!!error}
        helperText={helperText}
      />
    </Grid>
  );
}

export default FormField;