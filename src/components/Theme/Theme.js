import darkTheme from '../../themes/darkTheme';
import lightTheme from '../../themes/lightTheme';
import styles from './Theme.module.scss';
import { themeMode } from './ThemeMUIStyles';
import { ThemeProvider } from '@emotion/react';
import { DarkMode, LightMode } from '@mui/icons-material';
import { CssBaseline, IconButton } from '@mui/material';
import { useState } from 'react';

const Theme = props => {
  const { children } = props;
  const [selectedTheme, setSelectedTheme] = useState('light');

  const toggleTheme = () => {
    setSelectedTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };
  return (
    <ThemeProvider theme={selectedTheme === 'light' ? lightTheme : darkTheme}>
      <CssBaseline />
      {children}
      <div className={styles['theme__action']}>
        <IconButton color="inherit" onClick={toggleTheme}>
          {selectedTheme === 'light' && <LightMode sx={themeMode} />}
          {selectedTheme !== 'light' && <DarkMode sx={themeMode} />}
        </IconButton>
      </div>
    </ThemeProvider>
  );
};

export default Theme;
