import { linkStyles } from './SignHeaderMUIStyles';
import { Typography } from '@mui/material';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

/**
 * SignHeader component, a header for the sign in and sign up pages.
 *
 * @version 1.0.0
 * @author [Gobi Ahonon](https://github.com/ahonongobia)
 * @author [Werner Schmid](https://github.com/werner94fribourg)
 */
const SignHeader = ({ text }) => {
  return (
    <Typography component="h1" variant="h5">
      <NavLink to="/" style={linkStyles}>
        Back to Home
      </NavLink>{' '}
      - {text}
    </Typography>
  );
};

SignHeader.propTypes = {
  /** The text of the header.*/
  text: PropTypes.string,
};
export default SignHeader;
