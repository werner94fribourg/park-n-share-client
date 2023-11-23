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

  const getBadge = validated => {
    switch (validated) {
      case 'Yes':
        return 'success';
      case 'No':
        return 'danger';
      default:
        return 'danger';
    }
  };

  return (
    <div>
      <table className="parkings-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Description</th>
            <th>Type</th>
            <th>CHF/H</th>
            <th>Address</th>
            <th>Validation</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {processedParkings.map(parking => (
            <tr key={parking.id}>
              <td>{parking.id}</td>
              <td>{parking.name}</td>
              <td>{parking.description}</td>
              <td>{parking.type}</td>
              <td style={{ textAlign: 'center' }}>{parking.price}</td>
              <td>{parking.address}</td>
              <td>
                <span className={`badge badge-${getBadge(parking.validated)}`}>
                  {parking.validated}
                </span>
              </td>
              <td>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => viewParkingHandler(parking.id)}
                >
                  View
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button
        type="button"
        className="btn btn-primary"
        onClick={newParkingHandler}
      >
        New Parking Request
      </button>
    </div>
  );
};

export default UserParkings;
