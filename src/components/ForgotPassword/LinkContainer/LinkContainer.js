import SignLink from '../../UI/SignLink/SignLink';
import { linksWrapper, mainWrapper } from './LinkContainerMUIStyles';
import { Grid } from '@mui/material';

/**
 * LinkContainer component in the ForgotPassword page, containing the links to the Signin and Signup pages.
 *
 * @version 1.0.0
 * @author [Gobi Ahonon](https://github.com/ahonongobia)
 * @author [Werner Schmid](https://github.com/werner94fribourg)
 */
const LinkContainer = () => {
  return (
    <Grid container style={mainWrapper}>
      <Grid container style={linksWrapper}>
        <SignLink url="/signin" title="Sign In" />
        <SignLink url="/signup" title="Sign Up" />
      </Grid>
    </Grid>
  );
};

LinkContainer.propTypes = {};
export default LinkContainer;
