import Layout from '../components/Layout/Layout';
import NewParking from '../pages/NewParking';
import loadable from '@loadable/component';
import { useSelector } from 'react-redux';
import { Navigate, Route, Routes } from 'react-router';

const Profile = loadable(() => import('../pages/Profile'));

/**
 * Router containing Routes for authenticated users.
 *
 * @version 1.0.0
 * @author [Gobi Ahonon](https://github.com/ahonongobia)
 * @author [Werner Schmid](https://github.com/werner94fribourg)
 */
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

ProfileRouter.propTypes = {};
export default ProfileRouter;
