import { connect } from '../../../store/slices/auth';
import { notifyError } from '../../../store/slices/notification';
import { SIGNIN_FIELDS } from '../../../utils/globals';
import SignInputField from '../../UI/SignInputField/SignInputField';
import { formStyles, submitButtonStyles } from './SignInFormMUIStyles';
import { Box } from '@mui/material';
import Button from '@mui/material/Button';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';

/**
 * SignInForm component in the SignIn page, containing the form for signing in a user.
 *
 * @version 1.0.0
 * @author [Gobi Ahonon](https://github.com/ahonongobia)
 * @author [Werner Schmid](https://github.com/werner94fribourg)
 */
function SignInForm() {
  const dispatch = useDispatch();
  const correctCredentials = useSelector(
    state => state.auth.correctCredentials,
  );
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleInputChange = e => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  useEffect(() => {
    if (correctCredentials) {
      navigate('/otp');
    }
  }, [correctCredentials, navigate]);

  const handleSubmit = async event => {
    event.preventDefault();
    const data = await connect(formData, dispatch);

    if (data.valid) {
      navigate('/otp');
    } else {
      notifyError(data.message, dispatch);
    }
  };

  return (
    <Box component="form" noValidate onSubmit={handleSubmit} sx={formStyles}>
      {SIGNIN_FIELDS.map(field => (
        <SignInputField
          key={field.id}
          id={field.id}
          label={field.label}
          value={formData[field.id]}
          onChange={handleInputChange}
          type={field.type}
        />
      ))}
      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={submitButtonStyles}
      >
        Sign In
      </Button>
    </Box>
  );
}

SignInForm.propTypes = {};
export default SignInForm;
