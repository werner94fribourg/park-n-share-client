import styles from './HalfSection.module.scss';
import { contentStyles, titleStyles } from './HalfSectionMUIStyles';
import { Typography } from '@mui/material';
import PropTypes from 'prop-types';

/**
 * HalfSection component in the Description section of the Home page, containing the title and the text to be displayed in the half section of the description.
 *
 * @version 1.0.0
 * @author [Gobi Ahonon](https://github.com/ahonongobia)
 * @author [Werner Schmid](https://github.com/werner94fribourg)
 */
const HalfSection = props => {
  const { title, text } = props;
  return (
    <div>
      <div className={styles['section__title']}>
        <Typography variant="h4" sx={titleStyles}>
          {title}
        </Typography>
      </div>
      <div className={styles['section__content']}>
        <Typography variant="h5" component="p" sx={contentStyles}>
          {text}
        </Typography>
      </div>
    </div>
  );
};

HalfSection.propTypes = {
  /** Text to be displayed. */
  text: PropTypes.string,
  /** Title of the text to be displayed. */
  title: PropTypes.string,
};
export default HalfSection;
