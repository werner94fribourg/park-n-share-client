import { Typography } from '@mui/material'
import React from 'react'

export default function Typographys({text}) {
  return (
    <div>
        <Typography component="h1" variant="h5">
            <a
              href="/"
              style={{
                textDecoration: 'underline',
                cursor: 'pointer',
                color: 'blue',
              }}
            >
              Back to Home
            </a> - {text}
          </Typography>
    </div>
  )
}
