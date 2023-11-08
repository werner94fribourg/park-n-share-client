import Banner from '../components/Home/Banner/Banner';
import Description from '../components/Home/Description/Description';
import HomeActions from '../components/Home/HomeActions/HomeActions';
import Layout from '../components/Layout/Layout';

const Home = () => {
  return (
    <Layout>
      <Banner />
      <Description />
      <HomeActions />
    </Layout>
  );
};

Home.propTypes = {};

export default Home;
