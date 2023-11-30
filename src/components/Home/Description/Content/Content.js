import { splitInHalf } from '../../../../utils/utils';
import HalfSection from '../HalfSection/HalfSection';
import { Box } from '@mui/material';
import PropTypes from 'prop-types';

/**
 * Content component in the Description section of the Home page, containing the description of Park'N'Share.
 *
 * @version 1.0.0
 * @author [Gobi Ahonon](https://github.com/ahonongobia)
 * @author [Werner Schmid](https://github.com/werner94fribourg)
 */
const Content = props => {
  const { content, title } = props;

  const [firstHalf, secondHalf] = splitInHalf(content);

  return (
    <Box display="flex" justifyContent="space-between" alignItems="center">
      <HalfSection title={title} text={firstHalf} />
      <HalfSection title={<br />} text={secondHalf} />
    </Box>
  );
};

Content.propTypes = {
  /** Content of the description. */
  content: PropTypes.string,
  /** Title of the description. */
  title: PropTypes.string,
};
export default Content;
