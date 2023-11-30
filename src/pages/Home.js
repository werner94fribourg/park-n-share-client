import Banner from '../components/Home/Banner/Banner';
import Description from '../components/Home/Description/Description';
import HomeActions from '../components/Home/HomeActions/HomeActions';
import Layout from '../components/Layout/Layout';

/**
 * Component representing the Home page of the application.
 *
 * @version 1.0.0
 * @author [Gobi Ahonon](https://github.com/ahonongobia)
 * @author [Werner Schmid](https://github.com/werner94fribourg)
 */
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
