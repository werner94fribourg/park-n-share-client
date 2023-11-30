import styles from './Slideshow.module.scss';
import {
  navigationStyles,
  leftNavigationStyles,
  rightNavigationStyles,
} from './SlideshowMUIStyles';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';
import PropTypes from 'prop-types';
import { useState } from 'react';

/**
 * Slideshow component in the ParkingInfo page, containing the photos of a parking in a slideshow
 *
 * @version 1.0.0
 * @author [Gobi Ahonon](https://github.com/ahonongobia)
 * @author [Werner Schmid](https://github.com/werner94fribourg)
 */
const Slideshow = props => {
  const { photos } = props;

  let navigationContent = '';

  const [currentSlide, setCurrentSlide] = useState(0);
  const nbSlides = photos.length;

  const switchNextSlideHandler = () => {
    if (nbSlides === 0) return;
    setCurrentSlide(prevState => {
      const newValue = prevState + 1;
      return newValue >= nbSlides ? 0 : newValue;
    });
  };

  const switchPrevSlideHandler = () => {
    if (nbSlides === 0) return;

    setCurrentSlide(prevState => {
      const newValue = prevState - 1;
      return newValue < 0 ? nbSlides - 1 : newValue;
    });
  };

  if (nbSlides > 1) {
    navigationContent = (
      <>
        <ChevronLeft
          onClick={switchPrevSlideHandler}
          sx={{
            ...navigationStyles,
            ...leftNavigationStyles,
          }}
        />
        <ChevronRight
          onClick={switchNextSlideHandler}
          sx={{
            ...navigationStyles,
            ...rightNavigationStyles,
          }}
        />
        <span className={styles['slideshow__enum']}>
          {currentSlide + 1}/{photos.length}
        </span>
      </>
    );
  }

  return (
    <div className={styles.slideshow}>
      {photos.map((picture, index) => (
        <div
          key={picture}
          className={styles['slideshow__item']}
          style={{
            transform: `translateX(${100 * (index - currentSlide)}%)`,
          }}
          onClick={switchNextSlideHandler}
        >
          <img
            className={styles['slideshow__item-img']}
            src={picture}
            alt={`Slide ${index + 1}`}
          />
        </div>
      ))}
      {photos.length === 0 && (
        <div className={styles['slideshow__item']}>
          <div className={styles['slideshow__item-img']}>
            <div className={styles['slideshow__item-placeholder']}>
              No available photos
            </div>
          </div>
        </div>
      )}
      {navigationContent}
    </div>
  );
};

Slideshow.propTypes = {
  /** Array containing the photos of a parking */
  photos: PropTypes.array,
};
export default Slideshow;
