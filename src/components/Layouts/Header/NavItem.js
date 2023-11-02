import { Button } from '@mui/material';
import { NavLink } from 'react-router-dom';

const NavItem = props => {
  const {
    item: { title, url },
    text,
    children,
  } = props;
  return (
    <NavLink
      to={url}
      style={{ textDecoration: 'none', color: '#fff', display: 'inline-block' }}
    >
      {text && (
        <Button sx={{ fontSize: '15px', color: 'inherit' }}>{title}</Button>
      )}
      {!text && children}
    </NavLink>
  );
};

export default NavItem;
