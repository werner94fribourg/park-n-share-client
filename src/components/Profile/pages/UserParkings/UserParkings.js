import { Button } from '@mui/material';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { AgGridReact } from 'ag-grid-react';
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

  const columns = [
    { field: 'id', headerName: 'ID' },
    { field: 'name', headerName: 'Name' },
    { field: 'description', headerName: 'Description', width: 200 },
    { field: 'type', headerName: 'Type', width: 50 },
    {
      field: 'price',
      headerName: 'CHF/H',
      type: 'number',
      width: 50,
      align: 'center',
    },
    { field: 'address', headerName: 'Address', width: 200 },
    {
      field: 'validated',
      headerName: 'Validated',
      width: 50,
    },
    {
      field: 'view',
      headerName: '',
      hide: true,
      cellRendererFramework: params => (
        <Button
          type="button"
          onClick={viewParkingHandler.bind(null, params.data.id)}
        >
          View
        </Button>
      ),
    },
  ];

  const processedParkings = own.map(parking => ({
    id: parking._id,
    name: parking.name,
    description: parking.description,
    type: parking.type,
    price: parking.price,
    address: `${parking.location.street}${
      parking.location.housenumber ? ' ' + parking.location.housenumber : ''
    }, ${parking.location.postcode} ${parking.location.city}`,
    validated: parking.isValidated ? 'Yes' : 'No',
  }));

  //TODO: get my parkings + update state
  return (
    <>
      {/*<DataGrid
        columns={columns}
        rows={processedParkings}
        sx={{ position: 'absolute', width: '100%' }}
        initialState={{
          pagination: { paginationModel: { page: 0, pageSize: 5 } },
        }}
        pageSizeOptions={[5, 10]}
      />*/}
      <div style={{ height: 400, width: '100%' }}>
        <AgGridReact
          columnDefs={columns}
          rowData={processedParkings}
          domLayout="autoHeight"
          pagination={true}
          paginationPageSize={5}
        />
      </div>
      <Button type="button" onClick={newParkingHandler}>
        New Parking Request
      </Button>
    </>
  );
};

export default UserParkings;
