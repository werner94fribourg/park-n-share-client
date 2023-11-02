import Section0 from '../components/Home/Section0';
import Section1 from '../components/Home/Section1';
import Banner from '../components/Layouts/Banner';
import Header from '../components/Layouts/Header';
import React from 'react';

const Home = () => {
  return (
    <React.Fragment>
      <Header />
      <Banner />
      <Section0 />
      <Section1 />
    </React.Fragment>
  );
};

Home.propTypes = {};

export default Home;
