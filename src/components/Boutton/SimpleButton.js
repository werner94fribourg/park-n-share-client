import Button from '@mui/material/Button';
import React from 'react'

export default function SimpleButton({type,fullWidth,variant,text}) {
  return (
            <Button
              type={type}
              fullWidth
              variant={variant}
              sx={{ mt: 3, mb: 2 }}
            >
              {text}
            </Button>
        )
}
