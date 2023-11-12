import { notifySuccess } from '../../../../store/slices/notification';
import { sendConfirmationEmail } from '../../../../utils/api';
import RadiusButton from '../../../UI/RadiusButton/RadiusButton';
import SignInputField from '../../../UI/SignInputField/SignInputField';
import { formStyles, inputStyles } from './UserProfileMUIStyles';
import UserProfilePicture from './UserProfilePicture/UserProfilePicture';
import { Box, Button } from '@mui/material';
import Typography from '@mui/material/Typography';
import { useDispatch, useSelector } from 'react-redux';

function UserProfile() {
  const { username, phone, email, isEmailConfirmed } = useSelector(
    state => state.users.me,
  );
  const { jwt } = useSelector(state => state.auth);

  const dispatch = useDispatch();
  console.log(isEmailConfirmed);

  const handleConfirmationEmail = async () => {
    const response = await sendConfirmationEmail(jwt);
    if (response.valid) {
      notifySuccess(response.message, dispatch);
    }
  };

  return (
    <Box noValidate sx={formStyles}>
      <UserProfilePicture />
      <SignInputField
        id="email"
        label="Email"
        value={email}
        InputProps={inputStyles}
      />

      {!isEmailConfirmed && (
        <>
          <Typography variant="h6" gutterBottom component="div">
            Your Email is not confirmed
          </Typography>
          <RadiusButton
            type={Button}
            onClick={handleConfirmationEmail}
            text="Send Confirmation Link"
          />
        </>
      )}
      <SignInputField
        id="username"
        label="Username"
        value={username}
        InputProps={inputStyles}
      />
      <SignInputField
        id="phone"
        label="Phone Number"
        value={phone}
        InputProps={inputStyles}
      />
    </Box>
  );
}

export default UserProfile;
