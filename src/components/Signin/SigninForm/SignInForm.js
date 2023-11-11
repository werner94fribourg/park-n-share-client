import { connect } from '../../../store/slices/auth';
import { SIGNIN_FIELDS } from '../../../utils/globals';
import SignInputField from '../../UI/SignInputField/SignInputField';
import {
  errorStyles,
  formStyles,
  submitButtonStyles,
} from './SignInFormMUIStyles';
import { Box } from '@mui/material';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';

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

  const [error, setError] = useState(null);

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
      setError(data.message);
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
      {error && (
        <Typography variant="body2" color="error" sx={errorStyles}>
          {error}
        </Typography>
      )}
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

export default SignInForm;
