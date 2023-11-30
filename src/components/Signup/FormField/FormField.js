import SignInputField from '../../UI/SignInputField/SignInputField';
import { Grid } from '@mui/material';
import PropTypes from 'prop-types';

/**
 * FormField component in the Signup page, that represents a field in the Signup form.
 *
 * @version 1.0.0
 * @author [Gobi Ahonon](https://github.com/ahonongobia)
 * @author [Werner Schmid](https://github.com/werner94fribourg)
 */
function FormField({
  id,
  label,
  type,
  value,
  onChange,
  xs,
  sm,
  error,
  helperText,
}) {
  return (
    <Grid item xs={xs} sm={sm}>
      <SignInputField
        id={id}
        label={label}
        value={value}
        onChange={onChange}
        type={type}
        error={error}
        helperText={helperText}
      />
    </Grid>
  );
}

FormField.propTypes = {
  /** Id of the field. */
  id: PropTypes.string,
  /** Label of the field. */
  label: PropTypes.string,
  /** Type of the field. */
  type: PropTypes.string,
  /** Value of the field. */
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  /** Function to call when the value of the field changes. */
  onChange: PropTypes.func,
  /** Number of columns to use for the field in the grid. */
  xs: PropTypes.number,
  /** Number of columns to use for the field in the grid. */
  sm: PropTypes.number,
  /** Error status of the field. */
  error: PropTypes.bool,
  /** Error Helper text of the field. */
  helperText: PropTypes.string,
};
export default FormField;
