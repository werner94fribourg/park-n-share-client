import RadiusButton from '../../UI/RadiusButton/RadiusButton';
import Box from '@mui/material/Box';
import { useSelector } from 'react-redux';

const HomeActions = () => {
  const isAuth = useSelector(state => state.auth.isAuth);
  return (
    <Box display="flex" justifyContent="center" mt={2} mb={3}>
      <RadiusButton text="See Parkings" url="/parkings" />
      {!isAuth && <RadiusButton text="Sign Up" url="/signup" />}
      {!isAuth && <RadiusButton text="Sign In" url="/signin" />}
    </Box>
  );
};

export default HomeActions;
