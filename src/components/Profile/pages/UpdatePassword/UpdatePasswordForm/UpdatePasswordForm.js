import {
  notifyError,
  notifySuccess,
} from '../../../../../store/slices/notification';
import { updatePassword } from '../../../../../utils/api';
import {
  boxStyles,
  buttonStyles,
} from '../../../../ForgotPassword/ForgotPasswordForm/ForgotPasswordFormMUIStyles';
import SignInputField from '../../../../UI/SignInputField/SignInputField';
import { Box, Button } from '@mui/material';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

/**
 * UpdatePasswordForm component in the UpdatePassword page, containing the form for updating the password of a user.
 *
 * @version 1.0.0
 * @author [Gobi Ahonon](https://github.com/ahonongobia)
 * @author [Werner Schmid](https://github.com/werner94fribourg)
 */
export default function UpdatePasswordForm() {
  const [passwordCurrent, setPasswordCurrent] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const dispatch = useDispatch();
  const { jwt } = useSelector(state => state.auth);

  const PasswordChangeHandler = (field, value) => {
    switch (field) {
      case 'passwordCurrent':
        setPasswordCurrent(value);
        break;
      case 'password':
        setPassword(value);
        break;
      case 'passwordConfirm':
        setPasswordConfirm(value);
        break;
      default:
        break;
    }
  };

  const handleChange = event => {
    const { id, value } = event.target;
    PasswordChangeHandler(id, value);
  };

  const handleSubmit = async event => {
    event.preventDefault();
    const data = await updatePassword(
      jwt,
      passwordCurrent,
      password,
      passwordConfirm,
    );

    if (data.valid) {
      //  navigate('/');
      notifySuccess(data.message, dispatch);
      return;
    }
    notifyError(data.message, dispatch);
  };
  return (
    <Box component="form" noValidate onSubmit={handleSubmit} sx={boxStyles}>
      <SignInputField
        id="passwordCurrent"
        label="Actual Password"
        value={passwordCurrent}
        onChange={handleChange}
        type="password"
      />

      <SignInputField
        id="password"
        label="New Password"
        value={password}
        onChange={handleChange}
        type="password"
      />

      <SignInputField
        id="passwordConfirm"
        label="Confirm Password"
        value={passwordConfirm}
        onChange={handleChange}
        type="password"
      />
      <Button type="submit" fullWidth variant="contained" sx={buttonStyles}>
        Update Password
      </Button>
    </Box>
  );
}

UpdatePasswordForm.propTypes = {};
