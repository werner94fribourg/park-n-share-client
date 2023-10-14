import Home from '../pages/Home';
import { Route, Routes } from 'react-router';

const AppRouter = () => {
  return (
    <Routes>
      <Route path="*" element={<Home />} />
    </Routes>
  );
};

AppRouter.propTypes = {};

export default AppRouter;
