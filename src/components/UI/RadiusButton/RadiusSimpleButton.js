import { buttonStyle } from './RadiusButtonMUIStyles';
import Button from '@mui/material/Button';

export default function RadiusSimpleButton({ text, url, onClick }) {
  return (
    <Button
      component={Button}
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
