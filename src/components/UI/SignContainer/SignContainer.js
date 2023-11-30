import SignHeader from '../SignHeader/SignHeader';
import {
  avatarStyles,
  boxStyles,
  mainContainerStyles,
} from './SignContainerMUIStyles';
import { LockOutlined } from '@mui/icons-material';
import { Avatar, Box, Container } from '@mui/material';
import PropTypes from 'prop-types';

/**
 * SignContainer component, a container for the sign in and sign up pages.
 *
 * @version 1.0.0
 * @author [Gobi Ahonon](https://github.com/ahonongobia)
 * @author [Werner Schmid](https://github.com/werner94fribourg)
 */
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

SignContainer.propTypes = {
  /** The text of the header.*/
  headerText: PropTypes.string,
  /** The children of the component.*/
  children: PropTypes.node,
};
export default SignContainer;
