import SimpleButton from '../components/Button/SimpleButton';
import CustomTextField from '../components/General/Input';
import { sendPin } from '../store/slices/auth';
import { outputExpirationTime } from '../utils/utils';
import { Box, Container } from '@mui/material';
import { withStyles } from '@mui/styles';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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
  const dispatch = useDispatch();

  useEffect(() => {
    if (!correctCredentials) {
      navigate('/signin');
    }
  }, [correctCredentials, navigate]);

  const handleSubmit = async event => {
    event.preventDefault();

    const [{ value: pin }] = Array.from(event.target.elements).filter(
      element => element.name === 'pin',
    );

    const data = await sendPin(
      Number.parseInt(pin),
      localStorage.getItem('email'),
      dispatch,
    );

    if (data.valid) navigate('/profile');
  };

  if (!correctCredentials) return <div></div>;

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.otpContainer}>
        <div className={classes.otpLabel}>
          PIN CODE (End after {outputExpirationTime(timeout)})
        </div>
        <Box component="form" onSubmit={handleSubmit}>
          <CustomTextField
            required
            fullWidth
            id="otp"
            label="Pin code"
            name="pin"
            autoComplete="pin"
            type="number"
            autoFocus
          />
          <SimpleButton
            type="submit"
            fullWidth
            variant="contained"
            text="Submit Otp"
          />
        </Box>
      </div>
    </Container>
  );
};

export default withStyles(styles)(Otp);
