import { linkStyles } from './SignHeaderMUIStyles';
import { Typography } from '@mui/material';
import { NavLink } from 'react-router-dom';

const SignHeader = ({ text }) => {
  return (
    <Typography component="h1" variant="h5">
      <NavLink to="/" style={linkStyles}>
        Back to Home
      </NavLink>{' '}
      - {text}
    </Typography>
  );
};

export default SignHeader;
