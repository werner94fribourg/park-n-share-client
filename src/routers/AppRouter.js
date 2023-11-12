import Layout from '../components/Layout/Layout';
import AboutUs from '../pages/AboutUs';
import ConfirmEmail from '../pages/ConfirmEmail';
import Home from '../pages/Home';
import Parking from '../pages/Parking';
import ParkingInfo from '../pages/ParkingInfo';
import AuthRouter from './AuthRouter';
import ProfileRouter from './ProfileRouter';
import { useSelector } from 'react-redux';
import { Route, Routes } from 'react-router';

const AppRouter = () => {
  const isAuth = useSelector(state => state.auth.isAuth);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route
        path="/parkings"
        element={
          <Layout>
            <Parking />
          </Layout>
        }
      />
      <Route
        path="/parkings/:id"
        element={
          <Layout>
            <ParkingInfo />
          </Layout>
        }
      />
      <Route
        path="/about-us"
        element={
          <Layout>
            <AboutUs />
          </Layout>
        }
      />
      <Route path="/confirm-email/:confToken" element={<ConfirmEmail />} />
      <Route
        path="*"
        element={
          isAuth || localStorage.getItem('jwt') ? (
            <ProfileRouter />
          ) : (
            <AuthRouter />
          )
        }
        replace
      />
    </Routes>
  );
};

AppRouter.propTypes = {};

export default AppRouter;
