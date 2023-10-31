import React from 'react';
import Header from '../components/Layouts/Header';
import Section_1 from '../components/Home/Section_1';
import Cookies from '../components/Home/Cookies';
import Section_0 from '../components/Home/Section_0';
import Banner from '../components/Layouts/Banner';

const Home = () => {
  return <React.Fragment>
      <Header />
      <Banner />
      <Section_0 />
      <Section_1 />
  </React.Fragment>
};

Home.propTypes = {};

export default Home;
