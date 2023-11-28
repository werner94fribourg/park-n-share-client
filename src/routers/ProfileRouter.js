import Layout from '../components/Layout/Layout';
import NewParking from '../pages/NewParking';
import loadable from '@loadable/component';
import { useSelector } from 'react-redux';
import { Navigate, Route, Routes } from 'react-router';

const Profile = loadable(() => import('../pages/Profile'));

const ProfileRouter = () => {
  const {
    me: { role },
  } = useSelector(state => state.users);
  return (
    <Layout>
      <Routes>
        <Route path="/profile/*" element={<Profile />} />
        {role !== 'admin' && (
          <Route path="/parking-request" element={<NewParking />} />
        )}
        <Route path="*" element={<Navigate to="/" replace />} replace />
      </Routes>
    </Layout>
  );
};

export default ProfileRouter;
