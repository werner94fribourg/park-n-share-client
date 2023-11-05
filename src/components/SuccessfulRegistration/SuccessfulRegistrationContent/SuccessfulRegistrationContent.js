import { bodyStyles } from './SuccessfulRegistrationContentMUIStyles';
import { Typography } from '@mui/material';

const SuccessfulRegistrationContent = () => {
  return (
    <>
      <Typography component="h1" variant="h5">
        Registration Successful
      </Typography>
      <Typography variant="body2" color="textSecondary" sx={bodyStyles}>
        Thank you for registering. Your account has been successfully created.
      </Typography>
    </>
  );
};

export default SuccessfulRegistrationContent;
