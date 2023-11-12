import { PROFILE_NAV_ITEMS } from '../../../utils/globals';
import SideItem from './SideItem/SideItem';
import { appBarStyles, drawerStyles, listStyles } from './SidebarMUIStyles';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import * as React from 'react';

export default function SideBar() {
  return (
    <div>
      <CssBaseline />
      <AppBar position="fixed" sx={appBarStyles}>
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            Permanent drawer
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer sx={drawerStyles} variant="permanent" anchor="left">
        <Toolbar />
        <Divider />
        <List sx={listStyles}>
          {PROFILE_NAV_ITEMS.map(item => {
            return <SideItem key={item.url} item={item} />;
          })}
        </List>
      </Drawer>
    </div>
  );
}
