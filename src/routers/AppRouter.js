import Layout from '../components/Layouts/Layout';
import Home from '../pages/Home';
import Otp from '../pages/Otp';
import ParkingPage from '../pages/Parking';
import PasswordReset from '../pages/PasswordForget';
import Profile from '../pages/Profile';
import SignIn from '../pages/Signin';
import SignUp from '../pages/Signup';
import RegistrationSuccess from '../pages/templates/emails/Confirmation';
import { Route, Routes } from 'react-router-dom';

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/home" element={<Home />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/otp" element={<Otp />} />
      <Route path="/passwordReset" element={<PasswordReset />} />
      <Route path="/successfully" element={<RegistrationSuccess />} />
      <Route
        path="/myprofile"
        element={
          <Layout>
            <Profile />
          </Layout>
        }
      />
      <Route
        path="/myAccount"
        element={
          <Layout>
            <Profile />
          </Layout>
        }
      />

      <Route
        path="/parking"
        element={
          <Layout>
            <ParkingPage />
          </Layout>
        }
      />
    </Routes>
  );
};

AppRouter.propTypes = {};

export default AppRouter;
