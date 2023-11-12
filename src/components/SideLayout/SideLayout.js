import { containerStyles, contentStyles } from './SideLayoutMUIStyles';
import SideBar from './Sidebar/Sidebar';
import { Box } from '@mui/material';

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

export default SideLayout;
