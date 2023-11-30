import RectangularButton from '../../UI/RectangularButton/RectangularButton';
import styles from './Banner.module.scss';
import { typography } from './BannerMUIStyles';
import { Container, Grid, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

/**
 * Banner component in the Home page, containing the main title and a link to the Parkings page.
 *
 * @version 1.0.0
 * @author [Gobi Ahonon](https://github.com/ahonongobia)
 * @author [Werner Schmid](https://github.com/werner94fribourg)
 */
const Banner = () => {
  return (
    <section id="other" className={styles.banner}>
      <Container>
        <Grid container justifyContent="center" alignItems="center" spacing={2}>
          <Grid item xs={12} textAlign="center">
            <Typography variant="h2" sx={typography}>
              Find Your Parking at an affordable price in Switzerland
            </Typography>
            <Link to="/parkings">
              <RectangularButton text="BOOK PARKING" />
            </Link>
          </Grid>
        </Grid>
      </Container>
    </section>
  );
};

Banner.propTypes = {};
export default Banner;
