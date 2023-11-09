import Layout from '../components/Layout/Layout';
import UpdatePassword from '../components/Profile/UpdatePassword';
import SideBar from '../components/SideLayout/Sidebar';
import AboutUs from '../pages/AboutUs';
import Home from '../pages/Home';
import Parking from '../pages/Parking';
import ParkingInfo from '../pages/ParkingInfo';
import Profile from '../pages/Profile';
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
      <Route
        path="*"
        element={isAuth ? <ProfileRouter /> : <AuthRouter />}
        replace
      />

      <Route
        path="/change-password"
        element={
          <Layout>
            <SideBar />
            <UpdatePassword />
          </Layout>
        }
      />

      <Route
        path="/my-profiles"
        element={
          <Layout>
            <SideBar />
            <Profile />
          </Layout>
        }
      />
    </Routes>
  );
};

AppRouter.propTypes = {};

export default AppRouter;
