import { avatarStyles } from './OwnerMUIStyles';
import { Avatar, Box } from '@mui/material';

const Owner = props => {
  const {
    owner: { username, photo },
  } = props;

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      sx={{ position: 'absolute', top: 0, right: 0 }}
    >
      <Avatar alt="User Profile" src={photo} sx={avatarStyles} />
      {username}
    </Box>
  );
};

export default Owner;
