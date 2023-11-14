import { loadAllParkings } from '../../../store/slices/parking';
import styles from './Map.module.scss';
import { mapStyles, markerStyles } from './MapMapboxStyles';
import mapboxgl from 'mapbox-gl';
// eslint-disable-line import/no-webpack-loader-syntax
import { useEffect, useRef, useState } from 'react';
import MaptyMap, { Marker, Popup } from 'react-map-gl';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';

const Map = () => {
  const parkings = useSelector(state => state.parking.parkings);
  const dispatch = useDispatch();
  const [longitude, setLongitude] = useState(7.15);
  const [latitude, setLatitude] = useState(46.8);
  const [zoom, setZoom] = useState(9);
  const mapRef = useRef(null);
  const navigate = useNavigate();
  console.log(parkings);
  const { current } = mapRef;

  useEffect(() => {
    loadAllParkings(dispatch);
  }, [dispatch]);

  useEffect(() => {
    const getMap = current?.getMap;
    if (!getMap) return;

    const map = getMap();

    map.on('move', () => {
      setLongitude(map.getCenter().lng.toFixed(4));
      setLatitude(map.getCenter().lat.toFixed(4));
      setZoom(map.getZoom().toFixed(2));
    });
  }, [current]);

  const markerHandler = id => {
    navigate(`/parkings/${id}`);
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
        className={styles['map__container']}
        ref={mapRef}
        mapboxAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
        mapStyle="mapbox://styles/mapbox/streets-v12"
        style={mapStyles}
      >
        {parkings.map(parking => {
          const {
            _id: id,
            name,
            location: {
              coordinates: [lat, lng],
            },
          } = parking;
          return (
            <div key={id}>
              <Marker
                longitude={lng}
                latitude={lat}
                style={markerStyles}
                onClick={markerHandler.bind(null, id)}
              />
              <Popup longitude={lng} latitude={lat} offset={20}>
                {name}
              </Popup>
            </div>
          );
        })}
      </MaptyMap>
    </div>
  );
};

export default Map;
