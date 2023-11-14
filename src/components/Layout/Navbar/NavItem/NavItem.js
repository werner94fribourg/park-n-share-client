import { buttonStyles, navLinkStyles } from './NavItemMUIStyles';
import { Button } from '@mui/material';
import { NavLink } from 'react-router-dom';

const NavItem = props => {
  const {
    item: { title, url },
    text,
    children,
    className,
  } = props;

  return (
    <NavLink to={url} className={className} style={navLinkStyles}>
      {text && <Button sx={buttonStyles}>{title}</Button>}
      {!text && children}
    </NavLink>
  );
};

export default NavItem;
