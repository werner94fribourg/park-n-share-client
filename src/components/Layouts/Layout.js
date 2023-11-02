// Layout.js
import Header from './Header';
import React from 'react';

const Layout = ({ children }) => {
  return (
    <div>
      <Header />
      {children}
    </div>
  );
};

export default Layout;
