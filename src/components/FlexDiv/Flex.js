import Typography from '@mui/material/Typography';
import React from 'react';

export default function Flex({ title, text }) {
  return (
    <div>
      <div style={{ flex: 1 }}>
        <Typography variant="h4" sx={{ p: 5, textAlign: 'justify' }}>
          {title}
        </Typography>
      </div>
      <div style={{ flex: 1 }}>
        <Typography variant="h4" sx={{ p: 5, textAlign: 'justify' }}>
          {text}
        </Typography>
      </div>
    </div>
  );
}
