import React from 'react';
import Header from '../Layouts/Header';
import Section_1 from './Section_1';
import Cookies from './Cookies';

const Paragraph = () => {
  return (
    <div>
      <Header />
      <Section_1 />
      <Cookies />
    </div>
  );
};

Paragraph.propTypes = {};

export default Paragraph;
