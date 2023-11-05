import { addParkings } from '../../../store/slices/parking';
import styles from './Map.module.scss';
import { mapboxStyles } from './MapMapboxStyles';
import mapboxgl from 'mapbox-gl';
// eslint-disable-line import/no-webpack-loader-syntax
import 'mapbox-gl/dist/mapbox-gl.css';
import { useEffect, useRef, useState } from 'react';
import { Fragment } from 'react';
import MaptyMap, { Marker, Popup } from 'react-map-gl';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';

const fakeParkings = [
  {
    id: 1,
    name: `Parking Spot 1`,
    description: 'Test',
    capacity: '10',
    availability: '8',
    details: `This is a free parking spot available for 10 cars. Currently, 8 spaces are available for parking.`,
    lng: 7.1545435,
    lat: 46.846456456,
  },
];

const Map = () => {
  const parkings = useSelector(state => state.parking.parkings);
  const dispatch = useDispatch();
  const [longitude, setLongitude] = useState(7.15);
  const [latitude, setLatitude] = useState(46.8);
  const [zoom, setZoom] = useState(9);
  const mapRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      addParkings(fakeParkings, dispatch);
    }, 5000);

    return () => clearTimeout(timer);
  }, [dispatch]);

  useEffect(() => {
    const { current } = mapRef;
    if (!current) return;

    current?.getMap()?.on('move', () => {
      setLongitude(current.getCenter().lng.toFixed(4));
      setLatitude(current.getCenter().lat.toFixed(4));
      setZoom(current.getZoom().toFixed(2));
    });
  }, []);

  const markerHandler = parking => {
    navigate(`/parkings/${parking.id}`);
  };

  return (
    <div className={styles.map}>
      <div className={styles['map__sidebar']}>
        Longitude: {longitude} | Latitude: {latitude} | Zoom: {zoom}
      </div>
      <MaptyMap
        mapLib={mapboxgl}
        initialViewState={{
          longitude,
          latitude,
          zoom,
        }}
        ref={mapRef}
        mapboxAccessToken={mapboxgl.accessToken}
        mapStyle="mapbox://styles/mapbox/streets-v12"
      >
        {parkings.map(parking => (
          <Fragment key={parking.id}>
            <Marker
              key={parking.id}
              longitude={parking.lng}
              latitude={parking.lat}
              style={mapboxStyles}
              onClick={markerHandler.bind(null, parking)}
            />
            <Popup longitude={parking.lng} latitude={parking.lat} offset={20}>
              {parking.name}
            </Popup>
          </Fragment>
        ))}
      </MaptyMap>
    </div>
  );
};

export default Map;
