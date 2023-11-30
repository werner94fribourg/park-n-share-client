import { closeNavbar } from '../../store/slices/navbar';
import styles from './Layout.module.scss';
import Navbar from './Navbar/Navbar';
import PropTypes from 'prop-types';
import { Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';

/**
 * Component representing the Layout of the application. It contains the Navbar and the main content.
 *
 * @version 1.0.0
 * @author [Gobi Ahonon](https://github.com/ahonongobia)
 * @author [Werner Schmid](https://github.com/werner94fribourg)
 */
const Layout = ({ children }) => {
  const { isOpen } = useSelector(state => state.navbar);
  const dispatch = useDispatch();

  let classNames = styles.main;

  if (isOpen) classNames += ` ${styles['navbar-open']}`;

  const closeNavbarHandler = () => {
    closeNavbar(dispatch);
  };
  return (
    <Fragment>
      <Navbar />
      <main className={classNames} onClick={closeNavbarHandler}>
        <div className={styles.content}>{children}</div>
      </main>
    </Fragment>
  );
};

Layout.propTypes = {
  /** The children components of the Layout */
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};
export default Layout;
