import {
  notifyError,
  notifySuccess,
} from '../../../../../store/slices/notification';
import { setProfilePicture } from '../../../../../store/slices/users';
import styles from './UserProfilePicture.module.scss';
import { inputStyles } from './UserProfilePictureMUIStyles';
import { avatarStyles } from './UserProfilePictureMUIStyles';
import { Avatar, Box, IconButton, Input } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

/**
 * UserProfilePicture component in the Profile page, containing the profile picture of a user.
 *
 * @version 1.0.0
 * @author [Gobi Ahonon](https://github.com/ahonongobia)
 * @author [Werner Schmid](https://github.com/werner94fribourg)
 */
const UserProfilePhoto = () => {
  const { photo } = useSelector(state => state.users.me);
  const { jwt } = useSelector(state => state.auth);

  const dispatch = useDispatch();

  const handleFileSelect = async event => {
    const selectedFile = event.target.files[0];

    const formData = new FormData();

    formData.append('photo', selectedFile);

    const response = await setProfilePicture(jwt, formData, dispatch);
    if (response.valid) {
      notifySuccess(response.message, dispatch);
      return;
    }

    notifyError(response.message, dispatch);
  };

  return (
    <Box className={styles['profile-picture__container']}>
      <Box className={styles['profile-picture__avatar']}>
        <Avatar alt="User Profile" src={photo} sx={avatarStyles} />
      </Box>
      <Box className={styles['profile-picture__input-container']}>
        <Input
          type="file"
          onChange={handleFileSelect}
          sx={inputStyles}
          id="photo"
        />
        <label htmlFor="photo">
          <IconButton
            variant="contained"
            component="span"
            className={styles['profile-picture__photo']}
          >
            Upload Profile Picture
          </IconButton>
        </label>
      </Box>
    </Box>
  );
};

UserProfilePhoto.propTypes = {};
export default UserProfilePhoto;
