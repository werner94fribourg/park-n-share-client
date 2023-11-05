import Layout from '../components/Layout/Layout';
import Profile from '../pages/Profile';
import { Navigate, Route, Routes } from 'react-router';

const ProfileRouter = () => {
  return (
    <Layout>
      <Routes>
        {/** TODO: modularize Profile page */}
        <Route path="/profile" element={<Profile />} />
        {/** TODO: implement /logout route */}
        <Route path="*" element={<Navigate to="/" replace />} replace />
      </Routes>
    </Layout>
  );
};

export default ProfileRouter;
