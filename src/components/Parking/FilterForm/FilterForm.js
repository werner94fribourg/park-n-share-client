import { setFilters } from '../../../store/slices/parking';
import { parkingFiltersReducer } from '../../../utils/utils';
import {
  Box,
  Button,
  Checkbox,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  Typography,
  Slider,
} from '@mui/material';
import PropTypes from 'prop-types';
import { useEffect, useReducer } from 'react';
import { useDispatch, useSelector } from 'react-redux';

/**
 * FilterForm component in the Parking page, containing the form for filtering the displayed parkings.
 *
 * @version 1.0.0
 * @author [Gobi Ahonon](https://github.com/ahonongobia)
 * @author [Werner Schmid](https://github.com/werner94fribourg)
 */
const FilterForm = props => {
  const { visible, onClose, onSubmit } = props;
  const { filters } = useSelector(state => state.parking);
  const [selectedFilters, dispatchSelectedFilters] = useReducer(
    parkingFiltersReducer,
    filters,
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatchSelectedFilters({ type: 'init' });
  }, []);

  const cancelHandler = () => {
    dispatchSelectedFilters({ type: 'reset_all', payload: filters });
    onClose();
  };

  const submitHandler = async event => {
    event.preventDefault();
    const newFilters = {
      type: selectedFilters.indoor ? 'indoor' : undefined,
      maxPrice: selectedFilters.maxPrice,
    };
    setFilters(
      {
        type: selectedFilters.indoor ? 'indoor' : undefined,
        maxPrice: selectedFilters.maxPrice,
      },
      dispatch,
    );
    onSubmit(newFilters);
  };

  const indoorHandler = event => {
    event.stopPropagation();
    dispatchSelectedFilters({
      type: 'indoor',
      payload: !selectedFilters?.indoor,
    });
  };

  const maxPriceHandler = (event, newValue) => {
    event.stopPropagation();
    dispatchSelectedFilters({
      type: 'maxPrice',
      payload: newValue,
    });
  };

  return (
    <Dialog open={visible} onClose={cancelHandler}>
      <DialogTitle>Filter options</DialogTitle>
      <form onSubmit={submitHandler}>
        <DialogContent>
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="flex-start"
          >
            <Typography>Parking Type</Typography>
            <FormControlLabel
              control={
                <Checkbox
                  checked={selectedFilters?.indoor}
                  onClick={indoorHandler}
                />
              }
              label="Indoor"
            />
            <Box
              display="flex"
              flexDirection="column"
              justifyContent="flex-start"
            >
              <Typography>Price Range</Typography>
              <Slider
                value={selectedFilters?.maxPrice || 25}
                onChange={maxPriceHandler}
                max={25}
                step={0.5}
                size="small"
              />
              <Typography>
                {0}-{selectedFilters?.maxPrice} CHF
              </Typography>
            </Box>
          </Box>
        </DialogContent>
        <DialogContent>
          <Button type="button" onClick={cancelHandler}>
            Cancel
          </Button>
          <Button type="submit">Search</Button>
        </DialogContent>
      </form>
    </Dialog>
  );
};

FilterForm.propTypes = {
  /** The visibility status of the form */
  visible: PropTypes.bool,
  /** The handler function called when we want to close the form */
  onClose: PropTypes.func,
  /** The handler function called when we want to submit the form */
  onSubmit: PropTypes.func,
};
export default FilterForm;
