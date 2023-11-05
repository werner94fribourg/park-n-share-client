// Layout.js
import { closeNavbar } from '../../store/slices/navbar';
import styles from './Layout.module.scss';
import Navbar from './Navbar/Navbar';
import { Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';

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

export default Layout;
