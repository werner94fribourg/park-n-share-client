import React from 'react';
import { withStyles } from '@mui/styles';
import { MuiOtpInput } from 'mui-one-time-password-input';
import CustomTextField from '../components/General/Input';
import { Box, Container } from '@mui/material';
import SimpleButton from '../components/Boutton/SimpleButton';

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
  const [otp, setOtp] = React.useState('');
  const [secondsRemaining, setSecondsRemaining] = React.useState(120);

  const handleChange = (newValue) => {
    setOtp(newValue);
  };

  React.useEffect(() => {
    const timer = setTimeout(() => {
      if (secondsRemaining > 0) {
        setSecondsRemaining(secondsRemaining - 1);
      } else {
        // Redirect to the home page when the timer reaches zero
        window.location.href = '/'; // You can replace this with your actual home page URL
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [secondsRemaining]);

  return (
    <Container component="main" maxWidth="xs">
    <div className={classes.otpContainer}>
      <div className={classes.otpLabel}>
        PIN CODE (End in {secondsRemaining} sec)
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
        text = "Submit Otp"
      />
    </div>
    </Container>
  );
};

export default withStyles(styles)(Otp);
