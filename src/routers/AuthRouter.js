import ForgotPassword from '../pages/ForgotPassword';
import Otp from '../pages/Otp';
import SignIn from '../pages/Signin';
import SignUp from '../pages/Signup';
import SuccessfulRegistration from '../pages/SuccessfulRegistration';
import { Navigate, Route, Routes } from 'react-router';

const AuthRouter = () => {
  return (
    <Routes>
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/otp" element={<Otp />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route
        path="/successful-registration"
        element={<SuccessfulRegistration />}
      />
      <Route path="*" element={<Navigate to="/" replace />} replace />
    </Routes>
  );
};

export default AuthRouter;
