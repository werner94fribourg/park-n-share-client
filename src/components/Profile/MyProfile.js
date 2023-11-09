import { notify } from '../../store/slices/notification';
import { sendConfirmationEmail } from '../../utils/api';
import RadiusSimpleButton from '../UI/RadiusButton/RadiusSimpleButton';
import SignInputField from '../UI/SignInputField/SignInputField';
import { formStyles } from './ProfileFormMUIStyles';
import UserProfilePhoto from './UserAvatar';
import { Box } from '@mui/material';
import Typography from '@mui/material/Typography';
import { useDispatch, useSelector } from 'react-redux';

function MyProfile() {
  const { username, phone, email } = useSelector(state => state.users.me);
  const { jwt } = useSelector(state => state.auth);

  const dispatch = useDispatch();

  const handleConfirmationEmail = async () => {
    const response = await sendConfirmationEmail(jwt);
    if (response.valid) {
      notify(response.message, dispatch);
    }
  };
  return (
    <Box noValidate sx={formStyles}>
      <UserProfilePhoto />
      <SignInputField
        id="email"
        label="Email"
        value={email}
        InputProps={{ readOnly: true }}
      />

      <Typography variant="h6" gutterBottom component="div">
        Your Email is not confirmed
      </Typography>
      <RadiusSimpleButton
        onClick={handleConfirmationEmail}
        text="Send Confirmation Link"
      />
      <SignInputField
        id="username"
        label="Username"
        value={username}
        InputProps={{ readOnly: true }}
      />
      <SignInputField
        id="phone"
        label="Phone Number"
        value={phone}
        InputProps={{ readOnly: true }}
      />
    </Box>
  );
}

export default MyProfile;
