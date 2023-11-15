import { notifyError } from '../../../store/slices/notification';
import { loadAllParkings } from '../../../store/slices/parking';
import { calculateDistance, getUserLocation } from '../../../utils/utils';
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
  const [longitude, setLongitude] = useState(NaN);
  const [latitude, setLatitude] = useState(NaN);
  const [initialLoading, setInitialLoading] = useState(true);
  const [mapLoading, setMapLoading] = useState(true);
  const [mapSetting, setMapSetting] = useState(true);
  const [zoom, setZoom] = useState(15);
  const mapRef = useRef(null);
  const navigate = useNavigate();
  const { current } = mapRef;

  useEffect(() => {
    if (!initialLoading) return;
    getUserLocation().then(({ lat, lng }) => {
      setLatitude(lat);
      setLongitude(lng);
      setInitialLoading(false);
    });
  }, [initialLoading, dispatch]);

  useEffect(() => {
    const getMap = current?.getMap;
    if (!getMap) {
      setMapLoading(prevState => !prevState);
      return;
    }

    if (!mapSetting) return;
    const map = getMap();
    const border = map.getBounds().getNorthWest();

    const distance = calculateDistance(
      { lat: latitude, lng: longitude },
      border,
    );

    loadAllParkings(latitude, longitude, distance, dispatch).then(
      ({ valid, message }) => {
        if (!valid) notifyError(message, dispatch);
      },
    );
    map.on('move', async () => {
      const latitude = map.getCenter().lat.toFixed(4);
      const longitude = map.getCenter().lng.toFixed(4);
      const zoom = map.getZoom().toFixed(2);
      setLongitude(longitude);
      setLatitude(latitude);
      setZoom(zoom);

      const border = map.getBounds().getNorthWest();
      const distance = calculateDistance(
        { lat: latitude, lng: longitude },
        border,
      );
      const { valid, message } = await loadAllParkings(
        latitude,
        longitude,
        distance,
        dispatch,
      );
      if (!valid) notifyError(message, dispatch);
    });
    setMapLoading(false);
    setMapSetting(false);
  }, [latitude, longitude, mapSetting, mapLoading, current, dispatch]);

  const markerHandler = id => {
    navigate(`/parkings/${id}`);
  };

  return (
    <div className={styles.map}>
      {!isNaN(latitude) && !isNaN(longitude) && (
        <>
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
        </>
      )}
    </div>
  );
};

export default Map;
