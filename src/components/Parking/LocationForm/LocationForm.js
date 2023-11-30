import { getSuggestions } from '../../../utils/api';
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Autocomplete,
  TextField,
} from '@mui/material';
import PropTypes from 'prop-types';
import { useState } from 'react';

/**
 * LocationForm component in the Parking page, containing the form to enter a location for searching parkings.
 *
 * @version 1.0.0
 * @author [Gobi Ahonon](https://github.com/ahonongobia)
 * @author [Werner Schmid](https://github.com/werner94fribourg)
 */
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

LocationForm.propTypes = {
  /** The visibility status of the form */
  visible: PropTypes.bool,
  /** The handler function called when we want to close the form */
  onClose: PropTypes.func,
  /** The handler function called when we want to submit the form */
  onSubmit: PropTypes.func,
};
export default LocationForm;
