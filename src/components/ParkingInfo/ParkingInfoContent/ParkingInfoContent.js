import { notifyError } from '../../../store/slices/notification';
import { getParking } from '../../../utils/api';
import Description from '../Description/Description';
import Slideshow from '../Slideshow/Slideshow';
import styles from './ParkingInfoContent.module.scss';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router';

const ParkingInfoContent = () => {
  const { id } = useParams();
  const [parking, setParking] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    getParking(id).then(({ valid, parking, message }) => {
      if (!valid) {
        notifyError(message, dispatch);

        navigate('/parkings');
        return;
      }

      setParking(parking);
    });
  }, [id, dispatch, navigate]);

  if (!parking) return <div></div>;

  return (
    <div className={styles.container}>
      <Slideshow photos={parking.photos} />
      <Description parking={parking} />
    </div>
  );
};

export default ParkingInfoContent;
