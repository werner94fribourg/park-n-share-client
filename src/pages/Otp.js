import React from 'react';
import { withStyles } from '@mui/styles';
import { MuiOtpInput } from 'mui-one-time-password-input';

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
    <div className={classes.otpContainer}>
      <div className={classes.otpLabel}>
        PIN CODE (End in {secondsRemaining} seconds)
      </div>
      <MuiOtpInput
        className={classes.otpInput}
        value={otp}
        onChange={handleChange}
        // You can also pass additional props here.
      />
    </div>
  );
};

export default withStyles(styles)(Otp);
