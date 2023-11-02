import SimpleButton from '../components/Button/SimpleButton';
import CustomTextField from '../components/General/Input';
import { outputExpirationTime } from '../utils/utils';
import { Container } from '@mui/material';
import { withStyles } from '@mui/styles';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';

const styles = {
  otpContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
  },
  otpLabel: {
    fontSize: '30px',
    marginBottom: '10px',
  },
  otpInput: {
    // Define your custom styles for the OTP input here.
  },
};

const Otp = ({ classes }) => {
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

        <CustomTextField
          required
          fullWidth
          id="otp"
          label="Pin code"
          name="pin"
          autoComplete="pin"
          autoFocus
        />
        <SimpleButton
          type="submit"
          fullWidth
          variant="contained"
          text="Submit Otp"
        />
      </div>
    </Container>
  );
};

export default withStyles(styles)(Otp);
