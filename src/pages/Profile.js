import UpdatePassword from '../components/Profile/pages/UpdatePassword/UpdatePassword';
import UserProfile from '../components/Profile/pages/UserProfile/UserProfile';
import SideLayout from '../components/SideLayout/SideLayout';
import { Navigate, Route, Routes } from 'react-router';

const Profile = () => {
  return (
    <SideLayout>
      <Routes>
        <Route path="/" element={<UserProfile />} />
        <Route path="/password" element={<UpdatePassword />} />
        <Route path="*" element={<Navigate to="/" replace />} replace />
      </Routes>
    </SideLayout>
  );
};

export default Profile;
