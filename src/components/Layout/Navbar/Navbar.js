import { logout } from '../../../store/slices/auth';
import { openNavbar } from '../../../store/slices/navbar';
import {
  LOGGED_ITEMS,
  NAV_ITEMS,
  NON_LOGGED_ITEMS,
} from '../../../utils/globals';
import NavItem from './NavItem/NavItem';
import styles from './Navbar.module.scss';
import { useTheme } from '@emotion/react';
import { faBars, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  const theme = useTheme();
  const {
    me: { photo },
  } = useSelector(state => state.users);
  const { isAuth } = useSelector(state => state.auth);
  const { isOpen } = useSelector(state => state.navbar);

  const dispatch = useDispatch();
  const [matches, setMatches] = useState(
    window.matchMedia('(max-width: 1200px)').matches,
  );

  let linksClassNames = styles['navbar__links'];

  if (isOpen) linksClassNames += ` ${styles['navbar-open']}`;

  const openNavbarHandler = () => {
    openNavbar(dispatch);
  };

  const logoutHandler = event => {
    event.preventDefault();

    logout(dispatch);
  };

  useEffect(() => {
    window
      .matchMedia('(max-width: 1200px)')
      .addEventListener('change', e => setMatches(e.matches));
  }, []);

  return (
    <nav
      className={styles.navbar}
      style={{ backgroundColor: theme.palette.primary.main }}
    >
      <NavLink className={styles['navbar__brand']} to="/">
        <img
          src="https://i.postimg.cc/FzzbqYMb/default-monochrome-white.png"
          alt="Logo"
          className={styles['navbar__logo']}
        />
      </NavLink>
      <FontAwesomeIcon
        className={styles['navbar__toggle-btn']}
        icon={isOpen ? faXmark : faBars}
        onClick={openNavbarHandler}
      />
      <div
        className={linksClassNames}
        style={{
          backgroundColor: matches
            ? theme.palette.primary.light
            : 'transparent',
        }}
      >
        {NAV_ITEMS.map(item => {
          return (
            <NavItem
              key={item.url}
              className={({ isActive }) =>
                styles['navbar__link'] + (isActive ? ` ${styles.active}` : '')
              }
              item={item}
              text={true}
            />
          );
        })}
        {isAuth &&
          LOGGED_ITEMS.map(item => {
            return (
              <NavItem
                key={item.url}
                className={({ isActive }) =>
                  styles['navbar__link'] + (isActive ? ` ${styles.active}` : '')
                }
                item={item}
                text={true}
              />
            );
          })}
        {isAuth && (
          <NavItem
            className={`${styles['navbar__link']} ${styles['navbar__link--profile']}`}
            item={{ url: '/profile', title: 'My profile' }}
            text={false}
          >
            <img src={photo} alt="Profile" />
          </NavItem>
        )}
        {isAuth && (
          <a
            className={`${styles['navbar__link']} ${styles['navbar__logout']}`}
            href="/logout"
            onClick={logoutHandler}
            style={{ backgroundColor: theme.palette.primary.dark }}
          >
            <span className={styles['navbar__link-title']}> Logout</span>
          </a>
        )}
        {!isAuth &&
          NON_LOGGED_ITEMS.map(item => {
            return (
              <NavItem
                key={item.url}
                className={({ isActive }) =>
                  styles['navbar__link'] + (isActive ? ` ${styles.active}` : '')
                }
                item={item}
                text={true}
              />
            );
          })}
      </div>
    </nav>
  );
};

export default Navbar;
