import darkTheme from '../../themes/darkTheme';
import lightTheme from '../../themes/lightTheme';
import styles from './Theme.module.scss';
import { themeMode } from './ThemeMUIStyles';
import { ThemeProvider } from '@emotion/react';
import { DarkMode, LightMode } from '@mui/icons-material';
import { CssBaseline, IconButton } from '@mui/material';
import PropTypes from 'prop-types';
import { useState } from 'react';

/**
 * Theme component that wraps the application and provides the general MUI theme.
 *
 * @version 1.0.0
 * @author [Gobi Ahonon](https://github.com/ahonongobia)
 * @author [Werner Schmid](https://github.com/werner94fribourg)
 */
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

Theme.propTypes = {
  /** Children of the Theme. */
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};
export default Theme;
