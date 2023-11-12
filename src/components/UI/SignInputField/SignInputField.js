import { TextField } from '@mui/material';
import { makeStyles, createStyles } from '@mui/styles';

const useStyles = makeStyles(() =>
  createStyles({
    textField: {
      border: '1px solid',
      borderColor: 'secondary',
      borderRadius: '5px',
      '&:focus-within': {
        border: 'none',
      },
    },
  }),
);

const SignInputField = props => {
  const { id, label, value, onChange, type, error, helperText, InputProps } = props;

  const styles = useStyles();

  return (
    <TextField
      margin="normal"
      required
      fullWidth
      id={id}
      label={label}
      name={id}
      value={value}
      onChange={onChange}
      className={styles.textField}
      type={type}
      error={error}
      helperText={helperText}
      InputProps={InputProps}
    />
  );
};

export default SignInputField;
