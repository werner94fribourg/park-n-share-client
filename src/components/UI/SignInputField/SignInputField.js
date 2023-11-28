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
  const {
    id,
    label,
    value,
    onChange,
    type,
    error,
    helperText,
    inputProps,
    multiple,
    children,
    rows,
  } = props;

  const styles = useStyles();

  if (type === 'select') {
    return (
      <TextField
        select
        margin="normal"
        required
        fullWidth
        multiple={multiple}
        id={id}
        label={label}
        name={id}
        value={value}
        onChange={onChange}
        className={styles.textField}
        type={type}
        error={error}
        helperText={helperText}
        inputProps={inputProps}
      >
        {children}
      </TextField>
    );
  }

  if (type === 'textarea') {
    return (
      <TextField
        multiline
        rows={rows}
        margin="normal"
        required
        fullWidth
        multiple={multiple}
        id={id}
        label={label}
        name={id}
        value={value}
        onChange={onChange}
        className={styles.textField}
        type={type}
        error={error}
        helperText={helperText}
        inputProps={inputProps}
      />
    );
  }

  return (
    <TextField
      margin="normal"
      required
      fullWidth
      multiple={multiple}
      id={id}
      label={label}
      name={id}
      value={value}
      onChange={onChange}
      className={styles.textField}
      type={type}
      error={error}
      helperText={helperText}
      inputProps={inputProps}
    />
  );
};

export default SignInputField;
