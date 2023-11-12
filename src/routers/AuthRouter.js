import ForgotPassword from '../pages/ForgotPassword';
import Otp from '../pages/Otp';
import SignIn from '../pages/Signin';
import SignUp from '../pages/Signup';
import { closeNotification } from '../store/slices/notification';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Navigate, Route, Routes } from 'react-router';

const AuthRouter = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    closeNotification(dispatch);
  }, [dispatch]);

  return (
    <Routes>
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/otp" element={<Otp />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="*" element={<Navigate to="/" replace />} replace />
    </Routes>
  );
};

export default AuthRouter;
