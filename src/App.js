import React, { useState } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import AppRouter from './routers/AppRouter';
import { IconButton } from '@mui/material';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { LightMode } from '@mui/icons-material';

function App() {
  const [selectedTheme, setSelectedTheme] = useState('light'); // Initialize with 'light'

  // Define light theme
  const lightTheme = createTheme({
    palette: {
      type: 'light',
      // Define your light theme palette options
      // bac
    },
  });

  // Define dark theme
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

  const toggleTheme = () => {
    setSelectedTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeProvider theme={selectedTheme === 'dark' ? lightTheme : darkTheme}>
      <CssBaseline />
      <AppRouter />
      {/* You can add a button or any other UI element to toggle the theme */}
      <div
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          zIndex: '1000', // Ensure it's on top of other elements
        }}
      >
        <IconButton color="inherit" onClick={toggleTheme}>
          {selectedTheme === 'light' ? <LightMode sx={{fontSize: 30}}  /> : <DarkModeIcon sx={{fontSize: 30}} />}
        </IconButton>
      </div>
    </ThemeProvider>
  );
}
App.propTypes = {};

export default App;
