import { TextField } from '@mui/material';
import { makeStyles, createStyles } from '@mui/styles';
import PropTypes from 'prop-types';

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

/**
 * SignInputField component, representing an input field in the sign in and sign up pages.
 *
 * @version 1.0.0
 * @author [Gobi Ahonon](https://github.com/ahonongobia)
 * @author [Werner Schmid](https://github.com/werner94fribourg)
 */
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

SignInputField.propTypes = {
  /** The id of the input field.*/
  id: PropTypes.string,
  /** The label of the input field.*/
  label: PropTypes.string,
  /** The value of the input field.*/
  value: PropTypes.string,
  /** The onChange handler function when the values of the input field change.*/
  onChange: PropTypes.func,
  /** The type of the input field.*/
  type: PropTypes.string,
  /** The error status of the input field.*/
  error: PropTypes.bool,
  /** The error helperText of the input field.*/
  helperText: PropTypes.string,
  /** The inputProps of the input field.*/
  inputProps: PropTypes.object,
  /** The multiple status of the input field (for files only).*/
  multiple: PropTypes.bool,
  /** The children of the input field.*/
  children: PropTypes.node,
  /** The number of  rows of the input field (for textarea only).*/
  rows: PropTypes.number,
};
export default SignInputField;
