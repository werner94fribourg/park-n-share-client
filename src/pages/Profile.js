import SideLayout from '../components/SideLayout/SideLayout';
import loadable from '@loadable/component';
import { Navigate, Route, Routes } from 'react-router';

const UpdatePassword = loadable(() =>
  import('../components/Profile/pages/UpdatePassword/UpdatePassword'),
);
const UserProfile = loadable(() =>
  import('../components/Profile/pages/UserProfile/UserProfile'),
);

const Profile = () => {
  return (
    <SideLayout>
      <Routes>
        <Route path="/" element={<UserProfile />} />
        <Route path="/password" element={<UpdatePassword />} />
        <Route path="*" element={<Navigate to="/profile" replace />} replace />
      </Routes>
    </SideLayout>
  );
};

export default Profile;
