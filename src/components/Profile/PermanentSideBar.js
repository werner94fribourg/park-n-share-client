import SideBar from '../SideLayout/Sidebar';
import MyProfile from './MyProfile';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import * as React from 'react';

export default function PermanentSideBar() {
  return (
    <Box sx={{ display: 'flex', width: '1OO%' }}>
      <SideBar />
      <Box
        component="div"
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100%',
          bgcolor: 'background.default',
          p: 20,
        }}
      >
        <Box sx={{ maxWidth: '100%' }}>
          {' '}
          {/* Ajoutez une largeur maximale pour limiter la largeur du contenu */}
          <Toolbar />
          <MyProfile />
        </Box>
      </Box>
    </Box>
  );
}
