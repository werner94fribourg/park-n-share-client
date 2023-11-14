import { createTheme } from '@mui/material';

const darkTheme = createTheme({
  palette: {
    type: 'dark',
    // Define your dark theme palette options
    // background to dark to everything that has white background
    background: {
      default: '#000', // Set your default dark background
      paper: '#000', // Set your default paper background
    },

    // text to white to everything that has black text
    text: {
      primary: '#fff', // Set your default dark text color
      secondary: '#fff', // Set your default secondary dark text color
    },
  },
});

export default darkTheme;
