import SignInputField from '../../UI/SignInputField/SignInputField';
import { Grid } from '@mui/material';

function FormField({ id, label, type, value, onChange, xs, sm, helperText }) {
  return (
    <Grid item xs={xs} sm={sm}>
      <SignInputField
        id={id}
        label={label}
        value={value}
        onChange={onChange}
        type={type}
        helperText={helperText}
      />
    </Grid>
  );
}

export default FormField;
