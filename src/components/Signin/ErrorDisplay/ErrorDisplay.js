import { typographyStyles } from './ErrorDisplayMUIStyles';
import { Typography } from '@mui/material';

function ErrorDisplay({ error }) {
  return error ? (
    <Typography variant="body2" color="error" sx={typographyStyles}>
      {error}
    </Typography>
  ) : null;
}

export default ErrorDisplay;
