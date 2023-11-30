import RadiusButton from '../../UI/RadiusButton/RadiusButton';
import Box from '@mui/material/Box';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

/**
 * HomeActions component in the Home page, containing the buttons to navigate to the Parkings page, Sign Up page and Sign In page.
 *
 * @version 1.0.0
 * @author [Gobi Ahonon](https://github.com/ahonongobia)
 * @author [Werner Schmid](https://github.com/werner94fribourg)
 */
const HomeActions = () => {
  const isAuth = useSelector(state => state.auth.isAuth);
  return (
    <Box display="flex" justifyContent="center" mt={2} mb={3}>
      <RadiusButton type={Link} text="See Parkings" url="/parkings" />
      {!isAuth && <RadiusButton type={Link} text="Sign Up" url="/signup" />}
      {!isAuth && <RadiusButton type={Link} text="Sign In" url="/signin" />}
    </Box>
  );
};

HomeActions.propTypes = {};
export default HomeActions;
