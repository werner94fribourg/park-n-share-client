import { resetSessionID } from '../../../store/slices/auth';
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
import { disconnectSocket, setSocket } from '../../../utils/utils';
import Owner from '../Owner/Owner';
import styles from './Description.module.scss';
import { buttonStyles } from './DescriptionMUIStyles';
import Item from './Item/Item';
import { Typography, Rating, Box, Button } from '@mui/material';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';

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
      location: { street, housenumber, postcode, city },
    },
    parking,
  } = props;
  const [validation, setValidation] = useState(isValidated);
  const navigate = useNavigate();

  const address = `${street}${
    housenumber ? ' ' + housenumber : ''
  }, ${postcode} ${city}`;

  const reserveHandler = async id => {
    const socket = setSocket();
    socket.on('connexion_established', async data => {
      const { sessionID } = data;

      const { valid, message } = await startParkingReservation(
        jwt,
        id,
        sessionID,
        dispatch,
      );

      if (valid) {
        navigate('/parkings');
        notifySuccess(message, dispatch);
        return;
      }

      notifyError(message, dispatch);
    });

    socket.on('confirmation_message', data => {
      const { message } = data;
      setConfirmNotification(message, dispatch);
    });

    socket.on('successful_reservation', () => {
      resetConfirmNotification(dispatch);
      resetSessionID(dispatch);
      disconnectSocket(socket);
    });

    socket.on('unsuccessful_reservation', () => {
      resetConfirmNotification(dispatch);
      resetSessionID(dispatch);
      disconnectSocket(socket);
    });
  };

  const endReservationHandler = async id => {
    const socket = setSocket();
    socket.on('connexion_established', async data => {
      const { sessionID } = data;

      const { valid, message } = await endParkingReservation(
        jwt,
        id,
        sessionID,
        dispatch,
      );

      if (valid) {
        navigate('/parkings');
        notifySuccess(message, dispatch);
        return;
      }

      notifyError(message, dispatch);
    });

    socket.on('confirmation_message', data => {
      const { message } = data;
      setConfirmNotification(message, dispatch);
    });

    socket.on('successful_end', () => {
      resetConfirmNotification(dispatch);
      resetSessionID(dispatch);
      disconnectSocket(socket);
    });

    socket.on('unsuccessful_end', () => {
      resetConfirmNotification(dispatch);
      resetSessionID(dispatch);
      disconnectSocket(socket);
    });
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
        {isOccupied && parkingOccupation?.endDate !== undefined && (
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
        {isOccupied && parkingOccupation?.endDate === undefined && (
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

export default Description;
