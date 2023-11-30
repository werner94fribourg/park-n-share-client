import { contentStyles, titleStyles } from './ItemMUIStyles';
import { Typography } from '@mui/material';
import PropTypes from 'prop-types';

/**
 * Item component in the Description component, containing a descrption of a characteristic of a parking.
 *
 * @version 1.0.0
 * @author [Gobi Ahonon](https://github.com/ahonongobia)
 * @author [Werner Schmid](https://github.com/werner94fribourg)
 */
const Item = props => {
  const { title, content } = props;

  return (
    <>
      <Typography variant="h4" component="h2" sx={titleStyles}>
        {title}
      </Typography>
      <Typography variant="h5" component="p" sx={contentStyles}>
        {content}
      </Typography>
    </>
  );
};

Item.propTypes = {
  /**  displayed value of the characteristic */
  content: PropTypes.string,
  /** Type of the characteristic(Price, address,...) */
  title: PropTypes.string,
};
export default Item;
