import SideLayout from '../components/SideLayout/SideLayout';
import loadable from '@loadable/component';
import { useSelector } from 'react-redux';
import { Navigate, Route, Routes } from 'react-router';

const UpdatePassword = loadable(() =>
  import('../components/Profile/pages/UpdatePassword/UpdatePassword'),
);
const UserProfile = loadable(() =>
  import('../components/Profile/pages/UserProfile/UserProfile'),
);
const UserParkings = loadable(() =>
  import('../components/Profile/pages/UserParkings/UserParkings'),
);

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
        <Route path="*" element={<Navigate to="/profile" replace />} replace />
      </Routes>
    </SideLayout>
  );
};

export default Profile;
