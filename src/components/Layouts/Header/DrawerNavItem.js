import { ListItem, ListItemButton, ListItemText } from '@mui/material';
import { NavLink } from 'react-router-dom';

const DrawerNavItem = props => {
  const {
    item: { title, url },
    children,
    text,
  } = props;
  return (
    <ListItem disablePadding>
      <ListItemButton sx={{ textAlign: 'center' }}>
        <NavLink to={url} style={{ textDecoration: 'none' }}>
          {text && <ListItemText primary={title} />}
          {!text && children}
        </NavLink>
      </ListItemButton>
    </ListItem>
  );
};

export default DrawerNavItem;
