import {
  mainContainerStyles,
  resetPasswordStyles,
} from './ResetPasswordContainerMUIStyles';
import { Container } from '@mui/material';
import { withStyles } from '@mui/styles';
import PropTypes from 'prop-types';

/**
 * ResetPasswordContainer component in the ResetPassword page, that wraps the ResetPassword form.
 *
 * @version 1.0.0
 * @author [Gobi Ahonon](https://github.com/ahonongobia)
 * @author [Werner Schmid](https://github.com/werner94fribourg)
 */
const ResetPasswordContainer = props => {
  const { children, classes } = props;

  return (
    <Container component="main" maxWidth="xs" sx={mainContainerStyles}>
      <div className={classes.container}>{children}</div>
    </Container>
  );
};

ResetPasswordContainer.propTypes = {
  /** Children of the ResetPasswordContainer. */
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  /** Classes of the ResetPasswordContainer. */
  classes: PropTypes.object,
};
export default withStyles(resetPasswordStyles)(ResetPasswordContainer);
