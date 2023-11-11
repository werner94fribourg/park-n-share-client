const width = 240;

export const appBarStyles = {
  width: `calc(100% - ${width}px)`,
  ml: `${width}px`,
};

export const drawerStyles = {
  width,
  flexShrink: 0,
  '& .MuiDrawer-paper': {
    width: 240,
    boxSizing: 'border-box',
  },
};

export const listStyles = { top: 10 };
