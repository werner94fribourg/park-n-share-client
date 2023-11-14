import SignLink from '../../UI/SignLink/SignLink';
import { linksWrapper, mainWrapper } from './LinkContainerMUIStyles';
import { Grid } from '@mui/material';

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

export default LinkContainer;
