import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Banner from './Banner';
import Section_0 from '../Home/Section_0';
import { Link } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import { deepOrange, deepPurple } from '@mui/material/colors';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useState } from 'react';

const drawerWidth = 240;
const isAuth = true;
const navItems = isAuth ? ['Home', 'About Us', 'Become a provider', 'My Account', 'Sign Out'] : ['Home', 'About Us', 'Pricing', 'Sign In', 'Sign Up'];

function DrawerAppBar(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
       <Link to="/" style={{ textDecoration: 'none' }}>
       <img src="https://i.postimg.cc/Sxv4FcFj/default-monochrome.png" alt="Logo" style={{ width: 90, height: 100 }} />
        </Link>
      <Divider />
      <List>
      {navItems.map((item) => (
        <ListItem key={item} disablePadding>
          <ListItemButton sx={{ textAlign: 'center' }}>
            <Link to={`/${item.toLowerCase().replace(/ /g, '')}`} style={{ textDecoration: 'none' }}>
              <ListItemText primary={item} />
            </Link>
          </ListItemButton>
        </ListItem>
      ))}


      </List>
    </Box>
  );

  const container = window !== undefined ? () => window().document.body : undefined;
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar component="nav">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h4"
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
        <Link to="/" style={{ textDecoration: 'none' }}>
        <img src="https://i.postimg.cc/FzzbqYMb/default-monochrome-white.png" alt="Logo" style={{ width: '20%'}}   />
        </Link>
          </Typography>
          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            {navItems.map((item) => {
              const cleanedItem = item.toLowerCase().replace(/ /g, ''); // Supprime les espaces
              return (
                <Link key={item} to={`/${cleanedItem}`} style={{ textDecoration: 'none', color: '#fff' }}>
                  <Button sx={{ fontSize: '15px' }}>{item}</Button>
                </Link>
              );
            })}
            
          </Box>
          {isAuth && (
          <Avatar 
          sx={{ bgcolor: deepOrange[500] }}
          onClick={handleMenuOpen}
          >
            GA
          </Avatar> 
          )}

          {/* Menu déroulant */}
        <Menu
          id="profile-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          <Link to="/myprofile" style={{ textDecoration: 'none', color: 'inherit' }}>
          <MenuItem onClick={handleMenuClose} sx={{fontSize: 18}}>My Profile</MenuItem>
          </Link>
          <MenuItem onClick={handleMenuClose} sx={{fontSize: 18}}>Logout</MenuItem>
        </Menu>

        </Toolbar>
      </AppBar>
      
      <nav>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
         //TODO: Add a banner component and Section_0 component
    </Box>
    
  );
}

DrawerAppBar.propTypes = {
 
  window: PropTypes.func,
};

export default DrawerAppBar;
