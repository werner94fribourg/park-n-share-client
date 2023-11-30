import { linkStyles } from './SideItemMUIStyles';
import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

/**
 * SideItem component in the Sidebar, containing a navigation link in the sidebar.
 *
 * @version 1.0.0
 * @author [Gobi Ahonon](https://github.com/ahonongobia)
 * @author [Werner Schmid](https://github.com/werner94fribourg)
 */
const SideItem = props => {
  const { item } = props;
  return (
    <ListItem key={item.url} disablePadding>
      <NavLink to={item.url} style={linkStyles}>
        <ListItemButton>
          <ListItemIcon>{item.icon}</ListItemIcon>
          <ListItemText primary={item.title} />
        </ListItemButton>
      </NavLink>
    </ListItem>
  );
};

SideItem.propTypes = {
  /** Navigation Item of the Sidebar */
  item: PropTypes.object,
};
export default SideItem;
