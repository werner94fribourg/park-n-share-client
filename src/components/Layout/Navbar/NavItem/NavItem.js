import { buttonStyles, navLinkStyles } from './NavItemMUIStyles';
import { Button } from '@mui/material';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

/**
 * NavItem component in the Navbar, containing the links to the different pages of the application.
 *
 * @version 1.0.0
 * @author [Gobi Ahonon](https://github.com/ahonongobia)
 * @author [Werner Schmid](https://github.com/werner94fribourg)
 */
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

NavItem.propTypes = {
  /** Children of the NavItem. */
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  /** Class name of the NavItem. */
  className: PropTypes.string,
  /** Text to be displayed in the NavItem Link. */
  text: PropTypes.bool,
  /** Link Item to be displayed. */
  item: PropTypes.shape({
    /** Title of the item. */
    title: PropTypes.string,
    /** Url of the item. */
    url: PropTypes.string,
  }),
};

export default NavItem;
