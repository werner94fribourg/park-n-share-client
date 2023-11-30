import { notifyError } from '../../../store/slices/notification';
import { getParking } from '../../../utils/api';
import Description from '../Description/Description';
import Slideshow from '../Slideshow/Slideshow';
import styles from './ParkingInfoContent.module.scss';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router';

/**
 * ParkingInfoContent component in the ParkingInfo page, containing the characteristics of a parking.
 *
 * @version 1.0.0
 * @author [Gobi Ahonon](https://github.com/ahonongobia)
 * @author [Werner Schmid](https://github.com/werner94fribourg)
 */
const ParkingInfoContent = () => {
  const { jwt } = useSelector(state => state.auth);
  const { id } = useParams();
  const [parking, setParking] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    getParking(id, jwt).then(({ valid, parking, message }) => {
      if (!valid) {
        notifyError(message, dispatch);

        navigate('/parkings');
        return;
      }

      setParking(parking);
    });
  }, [id, jwt, dispatch, navigate]);

  if (!parking) return <div></div>;

  return (
    <div className={styles.container}>
      <Slideshow photos={parking.photos} />
      <Description parking={parking} />
    </div>
  );
};

ParkingInfoContent.propTypes = {};
export default ParkingInfoContent;
