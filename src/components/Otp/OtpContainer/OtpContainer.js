import { outputExpirationTime } from '../../../utils/utils';
import { otpStyles } from './OtpContainerMUIStyles';
import { Container } from '@mui/material';
import { withStyles } from '@mui/styles';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';

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
    <Container component="main" maxWidth="xs">
      <div className={classes.otpContainer}>
        <div className={classes.otpLabel}>
          PIN CODE (End after {outputExpirationTime(timeout)})
        </div>
        {children}
      </div>
    </Container>
  );
};

export default withStyles(otpStyles)(OtpContainer);
