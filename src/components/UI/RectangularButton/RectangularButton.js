import { Send } from '@mui/icons-material';
import { Button, Typography } from '@mui/material';

const RectangularButton = ({ text }) => {
  return (
    <div>
      <Button variant="contained" endIcon={<Send />}>
        <Typography variant="h3">{text}</Typography>
      </Button>
    </div>
  );
};

export default RectangularButton;
