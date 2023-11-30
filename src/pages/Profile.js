import ParkingRequests from '../components/Profile/pages/ParkingRequests/ParkingRequests';
import SideLayout from '../components/SideLayout/SideLayout';
import loadable from '@loadable/component';
import { useSelector } from 'react-redux';
import { Navigate, Route, Routes } from 'react-router';

const UpdatePassword = loadable(
  () => import('../components/Profile/pages/UpdatePassword/UpdatePassword'),
);
const UserProfile = loadable(
  () => import('../components/Profile/pages/UserProfile/UserProfile'),
);
const UserParkings = loadable(
  () => import('../components/Profile/pages/UserParkings/UserParkings'),
);

/**
 * Component representing the User Profile dashboard of the application, containing Routes for dashboard navigation.
 *
 * @version 1.0.0
 * @author [Gobi Ahonon](https://github.com/ahonongobia)
 * @author [Werner Schmid](https://github.com/werner94fribourg)
 */
const Profile = () => {
  const {
    me: { role },
  } = useSelector(state => state.users);

  return (
    <SideLayout>
      <Routes>
        <Route path="/" element={<UserProfile />} />
        <Route path="/password" element={<UpdatePassword />} />
        {role === 'provider' && (
          <Route path="/parkings" element={<UserParkings />} />
        )}
        {role === 'admin' && (
          <Route path="/requests" element={<ParkingRequests />} />
        )}
        <Route path="*" element={<Navigate to="/profile" replace />} replace />
      </Routes>
    </SideLayout>
  );
};

Profile.propTypes = {};
export default Profile;
