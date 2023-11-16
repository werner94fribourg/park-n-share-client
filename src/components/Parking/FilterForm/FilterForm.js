import {
  Box,
  Button,
  Checkbox,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  TextField,
} from '@mui/material';
import { useEffect, useRef, useState } from 'react';

const FilterForm = props => {
  const { visible, onClose } = props;
  //TODO: add form dispatcher for filters

  const submitHandler = async event => {
    event.preventDefault();
  };

  const changeHandler = (type, event) => {
    //dispatchForm({ type, payload: event.target.value });
  };

  return (
    <Dialog open={visible} onClose={onClose}>
      <DialogTitle>Filter options</DialogTitle>
      <form onClick={submitHandler}>
        <DialogContent>
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="flex-start"
          >
            <FormControlLabel control={<Checkbox />} label="Indoor" />
            <TextField id="maxPrice" label="Maximum price" type="number" />
          </Box>
        </DialogContent>
        <DialogContent>
          <Button type="button" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit">Search</Button>
        </DialogContent>
      </form>
    </Dialog>
  );
};

export default FilterForm;
