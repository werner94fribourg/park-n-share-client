import {
  notifyError,
  notifySuccess,
  resetConfirmNotification,
  setConfirmNotification,
} from '../../../store/slices/notification';
import {
  acceptParkingRequest,
  endParkingReservation,
  startParkingReservation,
} from '../../../store/slices/parking';
import Owner from '../Owner/Owner';
import styles from './Description.module.scss';
import { buttonStyles } from './DescriptionMUIStyles';
import Item from './Item/Item';
import { Typography, Rating, Box, Button } from '@mui/material';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';

/**
 * Description component in the ParkingInfo page, containing the description of a parking.
 *
 * @version 1.0.0
 * @author [Gobi Ahonon](https://github.com/ahonongobia)
 * @author [Werner Schmid](https://github.com/werner94fribourg)
 */
const Description = props => {
  const {
    me: { _id, role },
  } = useSelector(state => state.users);
  const { jwt, isAuth } = useSelector(state => state.auth);
  const { occupations } = useSelector(state => state.parking);

  const parkingOccupation = occupations.find(
    occupation => occupation.client._id === _id,
  );

  const dispatch = useDispatch();
  const {
    parking: {
      _id: id,
      name,
      description,
      price,
      type,
      isValidated,
      isOccupied,
      rating,
      location: { street, housenumber, postcode, city },
    },
    parking,
  } = props;
  const [validation, setValidation] = useState(isValidated);
  const navigate = useNavigate();

  const streetNumber = `${street ? street + ' ' : ''}${
    housenumber ? housenumber : ''
  }`;

  const address = `${streetNumber ? streetNumber + ', ' : ''}${
    postcode ? postcode + ' ' : ''
  }${city ? city : ''}`;

  const reserveHandler = async id => {
    const { valid, message } = await startParkingReservation(jwt, id, dispatch);

    if (valid) {
      navigate('/parkings');
      notifySuccess(message, dispatch);
      return;
    }

    notifyError(message, dispatch);
  };

  const endReservationHandler = async id => {
    const { valid, message } = await endParkingReservation(jwt, id, dispatch);

    if (valid) {
      navigate('/parkings');
      notifySuccess(message, dispatch);
      return;
    }

    notifyError(message, dispatch);

    setConfirmNotification('Reservation successfully ended.', dispatch);
    resetConfirmNotification(dispatch);
  };

  const validateHandler = async id => {
    const { valid, message } = await acceptParkingRequest(jwt, id, dispatch);

    if (!valid) {
      notifyError(message, dispatch);
      return;
    }

    notifySuccess(message, dispatch);
    setValidation(true);
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
        {rating && (
          <>
            <Rating
              name="rating"
              defaultValue={rating}
              precision={0.5}
              size="large"
              readOnly
            />
            {rating}
          </>
        )}
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
        {isAuth &&
          !isOccupied &&
          parking.owner._id !== _id &&
          role !== 'admin' && (
            <Button
              type="button"
              fullWidth
              variant="contained"
              sx={buttonStyles}
              onClick={reserveHandler.bind(null, id)}
            >
              Reserve
            </Button>
          )}
        {isAuth && isOccupied && parkingOccupation?.endDate !== undefined && (
          <Button
            type="button"
            fullWidth
            variant="contained"
            sx={buttonStyles}
            disabled
          >
            Occupied
          </Button>
        )}
        {isAuth &&
          isOccupied &&
          parkingOccupation &&
          parkingOccupation.endDate === undefined && (
            <Button
              type="button"
              fullWidth
              variant="contained"
              sx={buttonStyles}
              onClick={endReservationHandler.bind(null, id)}
            >
              End Reservation
            </Button>
          )}
        {role === 'admin' && !validation && (
          <Button
            type="button"
            fullWidth
            variant="contained"
            sx={buttonStyles}
            onClick={validateHandler.bind(null, id)}
          >
            Validate
          </Button>
        )}
      </Box>
    </div>
  );
};

Description.propTypes = {
  /** The displayed parking in the description */
  parking: PropTypes.object,
};
export default Description;
