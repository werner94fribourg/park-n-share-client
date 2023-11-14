import RadiusButton from '../../UI/RadiusButton/RadiusButton';
import Box from '@mui/material/Box';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

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

export default HomeActions;
