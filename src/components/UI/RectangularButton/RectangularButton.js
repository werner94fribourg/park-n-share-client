import { Send } from '@mui/icons-material';
import { Button, Typography } from '@mui/material';
import PropTypes from 'prop-types';

/**
 * RectangularButton component, a button with rectangular corners.
 *
 * @version 1.0.0
 * @author [Gobi Ahonon](https://github.com/ahonongobia)
 * @author [Werner Schmid](https://github.com/werner94fribourg)
 */
const RectangularButton = ({ text }) => {
  return (
    <div>
      <Button variant="contained" endIcon={<Send />}>
        <Typography variant="h3">{text}</Typography>
      </Button>
    </div>
  );
};

RectangularButton.propTypes = {
  /** The text of the button.*/
  text: PropTypes.string,
};
export default RectangularButton;
