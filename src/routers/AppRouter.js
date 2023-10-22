import Home from '../pages/Home';
import { Route, Routes } from 'react-router';
import SignIn from '../pages/Signin';
import SignUp from '../pages/Signup';
import Otp from '../pages/Otp';
import PasswordReset from '../pages/PasswordForget';

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path='/signin' element={<SignIn />} />
      <Route path='/signup' element={<SignUp />} />
      <Route path='/otp' element={<Otp />} />
      <Route path='/passwordReset' element={<PasswordReset />} />
    </Routes>
  );
};

AppRouter.propTypes = {};

export default AppRouter;
