import { outputExpirationTime } from '../../../utils/utils';
import { mainContainerStyles, otpStyles } from './OtpContainerMUIStyles';
import { Container } from '@mui/material';
import { withStyles } from '@mui/styles';
import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';

/**
 * OtpContainer component in the Otp page, that wraps the Pin confirmation form.
 *
 * @version 1.0.0
 * @author [Gobi Ahonon](https://github.com/ahonongobia)
 * @author [Werner Schmid](https://github.com/werner94fribourg)
 */
const OtpContainer = props => {
  const { children, classes } = props;
  const { timeout, correctCredentials } = useSelector(state => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (!correctCredentials) {
      navigate('/signin');
    }
  }, [correctCredentials, navigate]);

  if (!correctCredentials) return <div></div>;

  return (
    <Container component="main" maxWidth="xs" sx={mainContainerStyles}>
      <div className={classes.otpContainer}>
        <div className={classes.otpLabel}>
          PIN CODE (End after {outputExpirationTime(timeout)})
        </div>
        {children}
      </div>
    </Container>
  );
};

OtpContainer.propTypes = {
  /** Children of the OtpContainer. */
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  /** Classes of the OtpContainer. */
  classes: PropTypes.object,
};
export default withStyles(otpStyles)(OtpContainer);
