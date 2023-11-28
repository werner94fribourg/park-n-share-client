import { contentStyles, titleStyles } from './ItemMUIStyles';
import { Typography } from '@mui/material';

const Item = props => {
  const { title, content } = props;

  return (
    <>
      <Typography variant="h4" component="h2" sx={titleStyles}>
        {title}
      </Typography>
      <Typography variant="h5" component="p" sx={contentStyles}>
        {content}
      </Typography>
    </>
  );
};

export default Item;
