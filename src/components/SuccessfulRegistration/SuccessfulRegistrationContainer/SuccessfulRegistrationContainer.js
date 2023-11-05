import {
  avatarStyles,
  boxStyles,
  circleStyles,
} from './SuccessfulRegistrationContainerMUIStyles';
import CheckCircleOutline from '@mui/icons-material/CheckCircleOutline';
import { Box } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Container from '@mui/material/Container';

const SuccessfulRegistrationContainer = props => {
  const { children } = props;
  return (
    <Container component="main">
      <Box sx={boxStyles}>
        <Avatar sx={avatarStyles}>
          <CheckCircleOutline sx={circleStyles} />
        </Avatar>
        {children}
      </Box>
    </Container>
  );
};

export default SuccessfulRegistrationContainer;
