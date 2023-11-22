import Owner from '../Owner/Owner';
import styles from './Description.module.scss';
import { buttonStyles } from './DescriptionMUIStyles';
import Item from './Item/Item';
import { Typography, Rating, Box, Button } from '@mui/material';
import { useSelector } from 'react-redux';

const Description = props => {
  const {
    me: { _id },
  } = useSelector(state => state.users);
  const {
    parking: {
      name,
      description,
      price,
      type,
      location: { street, housenumber, postcode, city },
    },
    parking,
  } = props;

  const address = `${street}${
    housenumber ? ' ' + housenumber : ''
  }, ${postcode} ${city}`;

  const reserveHandler = () => {
    console.log('Reserve clicked');
  };

  return (
    <div className={styles.description}>
      <Typography
        variant="h3"
        component="h1"
        sx={{ marginTop: '2rem', marginBottom: '1rem', fontWeight: 'bold' }}
      >
        {name}
      </Typography>
      <Box
        display="flex"
        flexDirection="row"
        alignItems="center"
        justifyContent="flex-start"
        gap={1}
        sx={{ marginBottom: '2rem', fontSize: '1.6rem' }}
      >
        <Rating
          name="rating"
          defaultValue={2.2}
          precision={0.5}
          size="large"
          readOnly
        />
        2.5
      </Box>
      <Item title="Description" content={description} />
      <Item title="Address" content={address} />
      <Item title="Type" content={type} />
      <Item title="Price" content={`CHF${price} per hour`} />
      <Owner owner={parking.owner} />
      <Box
        display="flex"
        flexDirection="row"
        alignItems="center"
        justifyContent="flex-end"
      >
        {parking.owner._id !== _id && (
          <Button
            type="button"
            fullWidth
            variant="contained"
            sx={buttonStyles}
            onClick={reserveHandler}
          >
            Reserve
          </Button>
        )}
      </Box>
    </div>
  );
};

export default Description;
