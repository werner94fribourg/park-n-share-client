import { buttonStyle } from './RadiusButtonMUIStyles';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';

export default function RadiusButton({ text, url }) {
  return (
    <Button
      component={Link}
      to={url}
      variant="contained"
      color="primary"
      size="large"
      sx={buttonStyle}
    >
      {text}
    </Button>
  );
}
