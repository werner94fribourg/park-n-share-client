import React from 'react';
import TextField from '@mui/material/TextField';

const CustomTextField = (props) => {
    
  const {
    fullWidth = true,
    required = true,
    label,
    name,
    autoComplete,
    autoFocus,
    margin = 'normal',
  } = props;

  return (
    <TextField
      fullWidth={fullWidth}
      required={required}
      label={label}
      name={name}
      autoComplete={autoComplete}
      autoFocus={autoFocus}
      margin={margin}
    />
  );
};

export default CustomTextField;
