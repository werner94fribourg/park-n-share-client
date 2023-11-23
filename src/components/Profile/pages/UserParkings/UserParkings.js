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
    {
      key: 'avatar',
      label: 'ID',
    },
    {
      key: 'name',
      label: 'Name',
    },

    {
      key: 'description',
      label: 'Description',
      _style: { width: 200 },
    },
    {
      key: 'type',
      label: 'Type',
      _style: { width: 50 },
    },
    {
      key: 'price',
      label: 'CHF/H',
      _style: { width: 50, textAlign: 'center' },
    },
    {
      key: 'address',
      label: 'Address',
      _style: { width: 200 },
    },
    {
      key: 'validated',
      label: 'Validation',
      _style: { width: 50 },
    },
    {
      key: 'view',
      label: '',
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

  return <div></div>;
};

export default UserParkings;
