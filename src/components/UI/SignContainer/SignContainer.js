import SignHeader from '../SignHeader/SignHeader';
import {
  avatarStyles,
  boxStyles,
  mainContainerStyles,
} from './SignContainerMUIStyles';
import { LockOutlined } from '@mui/icons-material';
import { Avatar, Box, Container } from '@mui/material';

const SignContainer = props => {
  const { children, headerText } = props;

  return (
    <Container component="main" maxWidth="xs" sx={mainContainerStyles}>
      <Box sx={boxStyles}>
        <Avatar sx={avatarStyles}>
          <LockOutlined />
        </Avatar>
        <SignHeader text={headerText} />
        {children}
      </Box>
    </Container>
  );
};

export default SignContainer;
