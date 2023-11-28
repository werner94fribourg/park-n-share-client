import { notifyError } from '../../../store/slices/notification';
import { loadAllParkings } from '../../../store/slices/parking';
import { calculateDistance, getUserLocation } from '../../../utils/utils';
import FilterForm from '../FilterForm/FilterForm';
import LocationForm from '../LocationForm/LocationForm';
import styles from './Map.module.scss';
import {
  filterStyles,
  locationStyles,
  mapStyles,
  markerStyles,
} from './MapMapboxStyles';
import { FilterAlt, MyLocation } from '@mui/icons-material';
import mapboxgl from 'mapbox-gl';
// eslint-disable-line import/no-webpack-loader-syntax
import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import MaptyMap, { Marker, Popup } from 'react-map-gl';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';

const Map = () => {
  const {
    parkings,
    filters: { type, maxPrice, lat, lng, distance },
  } = useSelector(state => state.parking);
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
  const [formVisible, setFormVisible] = useState(false);
  const [locationFormVisible, setLocationFormVisible] = useState(false);

  const closeFormHandler = () => {
    setFormVisible(false);
  };

  const submitFormHandler = async filters => {
    const { valid, message } = await loadAllParkings(
      lat,
      lng,
      distance,
      filters,
      dispatch,
      true,
    );

    if (!valid) notifyError(message, dispatch);
    setFormVisible(false);
  };

  const closeLocationFormHandler = () => {
    setLocationFormVisible(false);
  };

  const submitLocationFormHandler = async (lat, lng) => {
    setLatitude(lat);
    setLongitude(lng);
    setLocationFormVisible(false);
    const map = mapRef.current.getMap();
    map.flyTo({
      center: [lat, lng],
      zoom,
      speed: 1.5, // Animation speed
    });
  };

  const filterHandler = () => {
    setLocationFormVisible(false);
    setFormVisible(true);
  };

  const locationHandler = () => {
    setFormVisible(false);
    setLocationFormVisible(true);
  };

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
      { lat: Number.parseFloat(latitude), lng: Number.parseFloat(longitude) },
      border,
    );

    loadAllParkings(
      latitude,
      longitude,
      distance,
      { type, maxPrice },
      dispatch,
    ).then(({ valid, message }) => {
      if (!valid) notifyError(message, dispatch);
    });
    map.on('move', async () => {
      const latitude = map.getCenter().lat.toFixed(4);
      const longitude = map.getCenter().lng.toFixed(4);
      const zoom = map.getZoom().toFixed(2);
      setLongitude(longitude);
      setLatitude(latitude);
      setZoom(zoom);

      const border = map.getBounds().getNorthWest();

      const distance = calculateDistance(
        { lat: Number.parseFloat(latitude), lng: Number.parseFloat(longitude) },
        border,
      );

      const { valid, message } = await loadAllParkings(
        latitude,
        longitude,
        distance,
        { type, maxPrice },
        dispatch,
      );
      if (!valid) notifyError(message, dispatch);
    });
    setMapLoading(false);
    setMapSetting(false);
  }, [
    latitude,
    longitude,
    mapSetting,
    mapLoading,
    current,
    maxPrice,
    type,
    dispatch,
  ]);

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
          <FilterAlt sx={filterStyles} onClick={filterHandler} />
          <MyLocation sx={locationStyles} onClick={locationHandler} />
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
      {createPortal(
        <FilterForm
          visible={formVisible}
          onClose={closeFormHandler}
          onSubmit={submitFormHandler}
        />,
        document.querySelector('body'),
      )}
      {createPortal(
        <LocationForm
          visible={locationFormVisible}
          onClose={closeLocationFormHandler}
          onSubmit={submitLocationFormHandler}
        />,
        document.querySelector('body'),
      )}
    </div>
  );
};

export default Map;
