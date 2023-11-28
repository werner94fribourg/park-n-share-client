import { getSuggestions } from '../../../utils/api';
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Autocomplete,
  TextField,
} from '@mui/material';
import { useState } from 'react';

const LocationForm = props => {
  const { visible, onClose, onSubmit } = props;
  const [location, setLocation] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [address, setAddress] = useState(null);
  const submitHandler = event => {
    event.preventDefault();

    const {
      coordinates: [lat, lng],
    } = address;
    setAddress(null);
    onSubmit(lat, lng);
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

  const addressChangeHandler = (event, address) => {
    setAddress(address);
  };

  return (
    <div>
      <Dialog open={visible} onClose={onClose}>
        <DialogTitle></DialogTitle>
        <form onSubmit={submitHandler}>
          <DialogContent>
            <Autocomplete
              options={suggestions}
              getOptionLabel={option => option.suggestion}
              renderInput={params => (
                <TextField
                  {...params}
                  id="location"
                  label="Search location"
                  value={location}
                  onChange={locationChangeHandler}
                  type="text"
                />
              )}
              value={address}
              onChange={addressChangeHandler}
            />
          </DialogContent>
          <DialogContent>
            <Button type="button" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={address === null}>
              Search Parkings
            </Button>
          </DialogContent>
        </form>
      </Dialog>
    </div>
  );
};

export default LocationForm;
