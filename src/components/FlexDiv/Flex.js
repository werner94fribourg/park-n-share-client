import React from 'react'
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

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
  )
}
