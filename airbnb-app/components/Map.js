import { useState } from 'react';
import ReactMapGL from 'react-map-gl';

function Map() {
  const [viewport, setViewPort] = useState({
    width: '100%',
    height: '100%',
    latitude: 37.7577,
    longitude: -122.4376,
    zoom: 11,
  })

  return (
    <ReactMapGL
      mapStyle="mapbox://styles/gabrielsolomon196/ckzao3h68000015pejxzcwr8z"
      mapboxApiAccessToken={process.env.mapbox_key}
      {...viewport}
    ></ReactMapGL>
  );
}

export default Map
