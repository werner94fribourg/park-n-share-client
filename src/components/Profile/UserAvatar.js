import { notify } from '../../store/slices/notification';
import { setProfilePicture } from '../../store/slices/users';
import styles from './profile.module.scss';
import EditIcon from '@mui/icons-material/Edit';
import { Avatar, Box, IconButton, Input } from '@mui/material';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const UserProfilePhoto = () => {
  const { photo } = useSelector(state => state.users.me);
  const [isEditVisible, setEditVisibility] = useState(false);
  const { jwt } = useSelector(state => state.auth);

  const dispatch = useDispatch();
  const handleEditClick = () => {
    console.log('Edit button clicked!');
  };

  const handleFileSelect = async event => {
    const selectedFile = event.target.files[0];

    console.log('Selected file:', selectedFile);

    const formData = new FormData();

    formData.append('photo', selectedFile);

    const response = await setProfilePicture(jwt, formData, dispatch);
    if (response.valid) {
      notify(response.message, dispatch);
    }
  };

  return (
    <Box className={styles.container}>
      <Box className={styles.horizontalContainer}>
        <Box className={styles.avatarContainer}>
          <Avatar
            alt="User Profile"
            src={photo}
            onMouseEnter={() => setEditVisibility(true)}
            onMouseLeave={() => setEditVisibility(false)}
            sx={{ width: 140, height: 140 }}
          />
          {isEditVisible && (
            <IconButton className={styles.editButton} onClick={handleEditClick}>
              <EditIcon />
            </IconButton>
          )}
        </Box>
        <Box className={styles.inputContainer}>
          <Input
            type="file"
            onChange={handleFileSelect}
            style={{ display: 'none' }}
            id="fileInput"
          />
          <label htmlFor="fileInput">
            <IconButton
              variant="contained"
              component="span"
              className={styles.fileInput}
            >
              Upload Profile Picture
            </IconButton>
          </label>
        </Box>
      </Box>
    </Box>
  );
};

export default UserProfilePhoto;
