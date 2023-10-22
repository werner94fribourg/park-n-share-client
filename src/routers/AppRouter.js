import Home from '../pages/Home';
import { Route, Routes } from 'react-router';
import SignIn from '../pages/Signin';
import SignUp from '../pages/Signup';

const AppRouter = () => {
  return (
    <Routes>
      <Route path="*" element={<Home />} />
      <Route path='/signin' element={<SignIn />} />
      <Route path='/signup' element={<SignUp />} />
    </Routes>
  );
};

AppRouter.propTypes = {};

export default AppRouter;
