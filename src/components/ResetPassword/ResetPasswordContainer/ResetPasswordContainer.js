import {
  containerStyles,
  resetPasswordStyles,
} from './ResetPasswordContainerMUIStyles';
import { Container } from '@mui/material';
import { withStyles } from '@mui/styles';

const ResetPasswordContainer = props => {
  const { children, classes } = props;

  return (
    <Container component="main" maxWidth="xs" sx={containerStyles}>
      <div className={classes.container}>{children}</div>
    </Container>
  );
};

export default withStyles(resetPasswordStyles)(ResetPasswordContainer);
