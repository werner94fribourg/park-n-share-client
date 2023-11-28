import { closeNotification } from '../store/slices/notification';
import loadable from '@loadable/component';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Navigate, Route, Routes } from 'react-router';

const ForgotPassword = loadable(() => import('../pages/ForgotPassword'));
const Otp = loadable(() => import('../pages/Otp'));
const ResetPassword = loadable(() => import('../pages/ResetPassword'));
const SignIn = loadable(() => import('../pages/Signin'));
const SignUp = loadable(() => import('../pages/Signup'));

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
      <Route path="/reset-password/:resetToken" element={<ResetPassword />} />
      <Route path="*" element={<Navigate to="/" replace />} replace />
    </Routes>
  );
};

export default AuthRouter;
