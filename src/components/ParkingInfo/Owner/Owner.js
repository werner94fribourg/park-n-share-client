import { avatarStyles } from './OwnerMUIStyles';
import { Avatar, Box } from '@mui/material';
import PropTypes from 'prop-types';

/**
 * Owner component in the ParkingInfo page, containing the owner of a parking.
 *
 * @version 1.0.0
 * @author [Gobi Ahonon](https://github.com/ahonongobia)
 * @author [Werner Schmid](https://github.com/werner94fribourg)
 */
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

Owner.propTypes = {
  /** Object containing the owner's information */
  owner: PropTypes.object,
};
export default Owner;
