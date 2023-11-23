import Layout from '../components/Layout/Layout';
import NewParking from '../pages/NewParking';
import loadable from '@loadable/component';
import { Navigate, Route, Routes } from 'react-router';

const Profile = loadable(() => import('../pages/Profile'));

const ProfileRouter = () => {
  return (
    <Layout>
      <Routes>
        <Route path="/profile/*" element={<Profile />} />
        <Route path="/parking-request" element={<NewParking />} />
        <Route path="*" element={<Navigate to="/" replace />} replace />
      </Routes>
    </Layout>
  );
};

export default ProfileRouter;
