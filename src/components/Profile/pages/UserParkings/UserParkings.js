import {
  addressCellStyles,
  chipStyles,
  descriptionCellStyles,
  tableContainerStyles,
  textContentCellStyles,
} from './UserParkingsMUIStyles';
import {
  Chip,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';

const UserParkings = () => {
  const { own } = useSelector(state => state.parking);
  const navigate = useNavigate();

  const viewParkingHandler = id => {
    navigate(`/parkings/${id}`);
  };

  const newParkingHandler = () => {
    navigate('/parking-request');
  };

  const processedParkings = own
    ? own?.map(parking => {
        const {
          location: { street, housenumber, postcode, city },
        } = parking;
        const streetNumber = `${street ? street + ' ' : ''}${
          housenumber ? housenumber : ''
        }`;

        const address = `${streetNumber ? streetNumber + ', ' : ''}${
          postcode ? postcode + ' ' : ''
        }${city ? city : ''}`;
        return {
          id: parking._id,
          name: parking.name,
          description: parking.description,
          type: parking.type,
          price: parking.price,
          address,
          validated: parking.isValidated ? 'Yes' : 'No',
        };
      })
    : [];

  const getBadge = validated => {
    switch (validated) {
      case 'Yes':
        return <Chip label="Yes" color="success" sx={chipStyles} />;
      case 'No':
        return <Chip label="No" color="error" sx={chipStyles} />;
      default:
        return <Chip label="No" color="error" sx={chipStyles} />;
    }
  };

  return (
    <div>
      <TableContainer component={Paper} sx={tableContainerStyles}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell sx={descriptionCellStyles}>Description</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>CHF/H</TableCell>
              <TableCell sx={addressCellStyles}>Address</TableCell>
              <TableCell>Validation</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {processedParkings.map(parking => (
              <TableRow key={parking.id}>
                <TableCell>{parking.id}</TableCell>
                <TableCell>{parking.name}</TableCell>
                <TableCell sx={textContentCellStyles}>
                  {parking.description}
                </TableCell>
                <TableCell>{parking.type}</TableCell>
                <TableCell sx={{ textAlign: 'center' }}>
                  {parking.price}
                </TableCell>
                <TableCell sx={textContentCellStyles}>
                  {parking.address}
                </TableCell>
                <TableCell>{getBadge(parking.validated)}</TableCell>
                <TableCell>
                  <Button
                    type="button"
                    variant="contained"
                    onClick={() => {
                      viewParkingHandler(parking.id);
                    }}
                  >
                    View
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Button type="button" variant="contained" onClick={newParkingHandler}>
        New Parking Request
      </Button>
    </div>
  );
};

export default UserParkings;
