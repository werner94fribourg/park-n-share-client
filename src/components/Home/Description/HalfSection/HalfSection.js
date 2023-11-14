import styles from './HalfSection.module.scss';
import { contentStyles, titleStyles } from './HalfSectionMUIStyles';
import { Typography } from '@mui/material';

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

export default HalfSection;
