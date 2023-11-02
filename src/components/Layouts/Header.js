import DrawerNavItem from './Header/DrawerNavItem';
import NavItem from './Header/NavItem';
import MenuIcon from '@mui/icons-material/Menu';
import AppBar from '@mui/material/AppBar';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { deepOrange } from '@mui/material/colors';
import PropTypes from 'prop-types';
import * as React from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

const drawerWidth = 240;
const navItems = [
  {
    title: 'Home',
    url: '/home',
  },
  {
    title: 'Parkings',
    url: '/parkings',
  },
  {
    title: 'About Us',
    url: '/about-us',
  },
];

const loggedItems = [
  {
    title: 'Become a provider',
    url: '/provider',
  },
  {
    title: 'Signout',
    url: '/signout',
  },
];

const nonLoggedItems = [
  {
    title: 'Signin',
    url: '/signin',
  },
  {
    title: 'Signup',
    url: '/signup',
  },
];

function Header(props) {
  const isAuth = useSelector(state => state.auth.isAuth);
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(prevState => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <NavLink to="/" style={{ textDecoration: 'none' }}>
        <img
          src="https://i.postimg.cc/Sxv4FcFj/default-monochrome.png"
          alt="Logo"
          style={{ width: 90, height: 100 }}
        />
      </NavLink>
      <Divider />
      <List>
        {isAuth && (
          <DrawerNavItem
            item={{ url: '/profile', title: 'My Account' }}
            text={false}
          >
            <Avatar sx={{ bgcolor: deepOrange[500], textDecoration: 'none' }}>
              GA
            </Avatar>
          </DrawerNavItem>
        )}
        {navItems.map(item => (
          <DrawerNavItem key={item.url} item={item} text={true} />
        ))}
        {isAuth &&
          loggedItems.map(item => (
            <DrawerNavItem key={item.url} item={item} text={true} />
          ))}
        {!isAuth &&
          nonLoggedItems.map(item => (
            <DrawerNavItem key={item.url} item={item} text={true} />
          ))}
      </List>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = event => {
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
            sx={{ mr: 2, display: { sm: 'none' }, flexBasis: 0 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h4"
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
            <NavLink to="/" style={{ textDecoration: 'none' }}>
              <img
                src="https://i.postimg.cc/FzzbqYMb/default-monochrome-white.png"
                alt="Logo"
                style={{ width: '20%' }}
              />
            </NavLink>
          </Typography>
          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            {navItems.map(item => {
              return <NavItem key={item.url} item={item} text={true} />;
            })}
            {isAuth &&
              loggedItems.map(item => {
                return <NavItem key={item.url} item={item} text={true} />;
              })}
            {isAuth && (
              <NavItem
                item={{ url: '/profile', title: 'My Account' }}
                text={false}
              >
                <Avatar
                  sx={{ bgcolor: deepOrange[500], textDecoration: 'inherit' }}
                  onClick={handleMenuOpen}
                >
                  GA
                </Avatar>
              </NavItem>
            )}
            {!isAuth &&
              nonLoggedItems.map(item => {
                return <NavItem key={item.url} item={item} text={true} />;
              })}
          </Box>
          {/* Menu déroulant */}
          <Menu
            id="profile-menu"
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <NavLink
              to="/profile"
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              <MenuItem onClick={handleMenuClose} sx={{ fontSize: 18 }}>
                My Account
              </MenuItem>
            </NavLink>
            <MenuItem onClick={handleMenuClose} sx={{ fontSize: 18 }}>
              Logout
            </MenuItem>
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
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
      {/*TODO: Add a banner component and Section0 component*/}
    </Box>
  );
}

Header.propTypes = {
  window: PropTypes.func,
};

export default Header;
