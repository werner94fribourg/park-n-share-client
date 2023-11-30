import { buttonStyle } from './RadiusButtonMUIStyles';
import Button from '@mui/material/Button';
import PropTypes from 'prop-types';

/**
 * RadiusButton component, a button with rounded corners.
 *
 * @version 1.0.0
 * @author [Gobi Ahonon](https://github.com/ahonongobia)
 * @author [Werner Schmid](https://github.com/werner94fribourg)
 */
export default function RadiusButton({ type, text, url, onClick }) {
  return (
    <Button
      component={type}
      to={url}
      variant="contained"
      color="primary"
      size="large"
      sx={buttonStyle}
      onClick={onClick}
    >
      {text}
    </Button>
  );
}

RadiusButton.propTypes = {
  /** The type of the button.*/
  type: PropTypes.string,
  /** The text of the button.*/
  text: PropTypes.string,
  /** The url of the button.*/
  url: PropTypes.string,
  /** The onClick function of the button.*/
  onClick: PropTypes.func,
};
