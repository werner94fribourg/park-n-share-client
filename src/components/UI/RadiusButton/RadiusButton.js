import { buttonStyle } from './RadiusButtonMUIStyles';
import Button from '@mui/material/Button';

export default function RadiusButton({ type, text, url, onClick }) {
  return (
    <Button
      component={type}
      to={url}
      variant="contained"
      color="primary"
      size="large"
      sx={buttonStyle}
      onClick={onClick}
    >
      {text}
    </Button>
  );
}
