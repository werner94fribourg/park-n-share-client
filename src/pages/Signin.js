import GoogleLoginButton from '../components/signin/GoogleLoginButton';
import PasswordResetLink from '../components/signin/PasswordResetLink';
import SignInForm from '../components/signin/SignInForm';
import SignUpLink from '../components/signin/SignUpLink';
import { connect } from '../store/slices/auth';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import FormControlLabel from '@mui/material/FormControlLabel';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import * as React from 'react';
import { GoogleLogin } from 'react-google-login';
// Ajout du composant GoogleLogin
import { useDispatch, useSelector } from 'react-redux';
import { Route, useNavigate } from 'react-router';
import { Link, Routes } from 'react-router-dom';
import Typographys from '../components/Signup/Typographys';

function SignIn() {
  const dispatch = useDispatch();
  const correctCredentials = useSelector(
    state => state.auth.correctCredentials,
  );
  const navigate = useNavigate();
  const [formData, setFormData] = React.useState({
    email: '',
    password: '',
  });

  const [error, setError] = React.useState(null);

  const handleInputChange = e => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  React.useEffect(() => {
    if (correctCredentials) {
      navigate('/otp');
    }
  }, [correctCredentials]);

  const handleSubmit = async event => {
    event.preventDefault();
    const conneted = await connect(formData, dispatch);

    if (conneted) {
      navigate('/otp');
    } else {
      setError('Invalid Credentials');
    }
  };

  return (
    <ThemeProvider theme={createTheme()}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typographys text="Sign In" />
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <SignInForm
              formData={formData}
              error={error}
              handleInputChange={handleInputChange}
              handleSubmit={handleSubmit}
            />
            <GoogleLoginButton />
            <Grid container style={{ margin: 10 }}>
              <Grid item xs>
                <PasswordResetLink />
              </Grid>
              <Grid item>
                <SignUpLink />
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default SignIn;
