import { getSuggestions } from '../../utils/api';
import {
  invalidParkingFieldsReducer,
  parkingReducers,
} from '../../utils/utils';
import SignInputField from '../UI/SignInputField/SignInputField';
import {
  Box,
  Button,
  Select,
  MenuItem,
  InputLabel,
  TextareaAutosize,
  Autocomplete,
  TextField,
} from '@mui/material';
import React, { useEffect, useReducer, useState } from 'react';

const NewParkingForm = () => {
  const [typedParking, dispatchParking] = useReducer(
    parkingReducers,
    undefined,
  );

  const [messages, dispatchMessages] = useReducer(
    invalidParkingFieldsReducer,
    undefined,
  );

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
    const {
      coordinates: [lat, lng],
    } = selectedAddress;
    dispatchParking({ type: 'coordinates', payload: [lat, lng] });
  };

  const handleSubmit = e => {
    e.preventDefault();
    // Handle the form submission with formValues
    console.log(typedParking);
  };

  return (
    <Box
      noValidate
      component="form"
      sx={{ mt: 5, width: '100%', paddingLeft: '20%', paddingRight: '20%' }}
      onSubmit={handleSubmit}
    >
      <SignInputField
        id="name"
        label="Name"
        value={typedParking ? typedParking.name : ''}
        onChange={handleInputChange.bind(null, 'name')}
        error={messages ? messages.name !== '' : false}
        helperText={messages ? messages.name : ''}
      />

      {/* Textarea Input Field for Description */}
      <InputLabel htmlFor="description">Description</InputLabel>
      <TextareaAutosize
        id="description"
        minRows={8}
        placeholder="Enter description..."
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

      {/* Select Input Field for Type */}
      <InputLabel htmlFor="type">Type</InputLabel>
      <Select
        label="Type"
        id="type"
        name="type"
        fullWidth
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
      </Select>

      {/* Autocomplete Input Field for Address */}
      <InputLabel htmlFor="address">Address</InputLabel>
      <Autocomplete
        options={suggestions}
        getOptionLabel={option => option.suggestion}
        renderInput={params => (
          <TextField
            {...params}
            id="address"
            label="Search address"
            value={location}
            onChange={locationChangeHandler}
            type="text"
          />
        )}
        value={address}
        onChange={addressChangeHandler}
        sx={{ mb: 2 }}
      />

      {/* File Input Field */}

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
