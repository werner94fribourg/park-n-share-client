import { containerStyles, contentStyles } from './SideLayoutMUIStyles';
import SideBar from './Sidebar/Sidebar';
import { Box } from '@mui/material';
import PropTypes from 'prop-types';

/**
 * SideLayout component in the SideLayout page, that wraps the content of the page in the profile sections.
 *
 * @version 1.0.0
 * @author [Gobi Ahonon](https://github.com/ahonongobia)
 * @author [Werner Schmid](https://github.com/werner94fribourg)
 */
const SideLayout = props => {
  const { children } = props;
  return (
    <Box sx={containerStyles}>
      <SideBar />
      <Box component="div" sx={contentStyles}>
        {children}
      </Box>
    </Box>
  );
};

SideLayout.propTypes = {
  /** Children of the SideLayout. */
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};
export default SideLayout;
