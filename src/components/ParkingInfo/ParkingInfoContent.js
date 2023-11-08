import { useParams } from 'react-router';

const ParkingInfoContent = () => {
  const { id } = useParams();

  console.log(id);
  return <div></div>;
};

export default ParkingInfoContent;
