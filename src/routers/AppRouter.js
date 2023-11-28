import loadable from '@loadable/component';
import { useSelector } from 'react-redux';
import { Route, Routes } from 'react-router';

const AboutUs = loadable(() => import('../pages/AboutUs'));
const ConfirmEmail = loadable(() => import('../pages/ConfirmEmail'));
const Home = loadable(() => import('../pages/Home'));
const Parking = loadable(() => import('../pages/Parking'));
const ParkingInfo = loadable(() => import('../pages/ParkingInfo'));
const AuthRouter = loadable(() => import('./AuthRouter'));
const ProfileRouter = loadable(() => import('./ProfileRouter'));
const Layout = loadable(() => import('../components/Layout/Layout'));

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
