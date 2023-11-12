import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import { NavLink } from 'react-router-dom';

const SideItem = props => {
  const { item } = props;
  return (
    <ListItem key={item.url} disablePadding>
      <NavLink to={item.url} style={{ textDecoration: 'none' }}>
        <ListItemButton>
          <ListItemIcon>{item.icon}</ListItemIcon>
          <ListItemText primary={item.title} />
        </ListItemButton>
      </NavLink>
    </ListItem>
  );
};

export default SideItem;
