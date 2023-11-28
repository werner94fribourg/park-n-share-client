import { notifyError, notifySuccess } from '../../store/slices/notification';
import { newParkingRequest } from '../../store/slices/parking';
import { getSuggestions } from '../../utils/api';
import {
  invalidParkingFieldsReducer,
  parkingReducers,
} from '../../utils/utils';
import SignInputField from '../UI/SignInputField/SignInputField';
import {
  Box,
  Button,
  MenuItem,
  Autocomplete,
  TextField,
  Typography,
} from '@mui/material';
import React, { useEffect, useReducer, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';

const NewParkingForm = () => {
  const { jwt } = useSelector(state => state.auth);
  const [typedParking, dispatchParking] = useReducer(
    parkingReducers,
    undefined,
  );
  const [messages, dispatchMessages] = useReducer(
    invalidParkingFieldsReducer,
    undefined,
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatchParking({ type: 'init' });
    dispatchMessages({ type: 'init' });
  }, []);

  const [location, setLocation] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [address, setAddress] = useState(null);

  const handleFileChange = e => {
    const files = e.target.files;

    dispatchParking({ type: 'photos', payload: Array.from(files) });
  };

  const handleInputChange = (type, e) => {
    if (messages[type]) {
      dispatchParking({ type: `reset_${type}` });
    }
    dispatchParking({ type, payload: e.target.value });
  };

  const locationChangeHandler = async event => {
    setLocation(event.target.value);
    if (event.target.value !== '') {
      const suggestions = await getSuggestions(event.target.value);
      setSuggestions(suggestions);
    } else {
      setSuggestions([]);
    }
  };

  const addressChangeHandler = (_, selectedAddress) => {
    setAddress(selectedAddress);
    if (selectedAddress === null) {
      dispatchParking({ type: 'coordinates', payload: [] });
      return;
    }
    const {
      coordinates: [lng, lat],
    } = selectedAddress;
    dispatchParking({ type: 'coordinates', payload: [lat, lng] });
  };

  const handleSubmit = async e => {
    e.preventDefault();

    dispatchMessages({ type: 'reset_all' });

    console.log(typedParking);
    const formData = new FormData();

    Object.entries(typedParking).forEach(([key, value]) => {
      if (key === 'photos')
        value.forEach(photo => formData.append(key, photo, photo.name));
      else if (Array.isArray(value))
        value.forEach((v, index) => formData.append(`${key}[${index}]`, v));
      else formData.append(key, value);
    });

    const { valid, message, fields } = await newParkingRequest(
      jwt,
      formData,
      dispatch,
    );

    if (!fields && !valid) {
      notifyError(message, dispatch);
      return;
    }

    if (fields && fields.length > 0) {
      fields.forEach(field => {
        const [[key, value]] = Object.entries(field);
        dispatchMessages({ type: key, payload: value });
      });
      return;
    }

    notifySuccess(message, dispatch);

    navigate('/profile');
  };

  return (
    <Box
      noValidate
      component="form"
      sx={{ mt: 5, width: '100%', paddingLeft: '20%', paddingRight: '20%' }}
      onSubmit={handleSubmit}
    >
      <Typography
        variant="h3"
        component="h1"
        sx={{ marginTop: '2rem', marginBottom: '1rem', fontWeight: 'bold' }}
      >
        New Parking Request
      </Typography>
      <SignInputField
        id="name"
        label="Name"
        value={typedParking ? typedParking.name : ''}
        onChange={handleInputChange.bind(null, 'name')}
        error={messages ? messages.name !== '' : false}
        helperText={messages ? messages.name : ''}
      />

      {/* Textarea Input Field for Description */}
      <SignInputField
        id="description"
        label="Description"
        type="textarea"
        rows={8}
        style={{ width: '100%' }}
        value={typedParking ? typedParking.description : ''}
        onChange={handleInputChange.bind(null, 'description')}
        error={messages ? messages.description !== '' : false}
        helperText={messages ? messages.description : ''}
      />
      <SignInputField
        id="price"
        label="Price"
        type="number"
        value={typedParking ? typedParking.price : ''}
        onChange={handleInputChange.bind(null, 'price')}
        error={messages ? messages.price !== '' : false}
        helperText={messages ? messages.price : ''}
      />
      <SignInputField
        id="type"
        label="Type"
        type="select"
        value={typedParking ? typedParking.type : ''}
        onChange={handleInputChange.bind(null, 'type')}
        error={messages ? messages.type !== '' : false}
        helperText={messages ? messages.type : ''}
      >
        <MenuItem name="type" value="indoor">
          Indoor
        </MenuItem>
        <MenuItem name="type" value="outdoor">
          Outdoor
        </MenuItem>
      </SignInputField>
      <Autocomplete
        options={suggestions}
        getOptionLabel={option => option.suggestion}
        renderInput={params => (
          <TextField
            {...params}
            id="address"
            label="Address"
            value={location}
            onChange={locationChangeHandler}
            type="text"
          />
        )}
        value={address}
        onChange={addressChangeHandler}
        sx={{ mb: 2 }}
      />
      <SignInputField
        id="photos"
        label="Photos"
        type="file"
        onChange={handleFileChange}
        inputProps={{ multiple: true, accept: 'image/*' }}
      />

      <Button type="submit" sx={{ mt: 3 }} fullWidth variant="contained">
        Add Parking
      </Button>
    </Box>
  );
};

export default NewParkingForm;
