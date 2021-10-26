import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';



mapboxgl.accessToken = 'pk.eyJ1IjoiYWNlZmxhbmtlciIsImEiOiJja3RudjFrZDEwNmxxMnVwbWs5aW85eGVyIn0.j-do5McYg-VrWM4qQmAIKg';

export default function Map() {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const geocoder = useRef(null);
  const tempMarker = useRef(new mapboxgl.Marker());
  const [lng, setLng] = useState(-123.1207);
  const [lat, setLat] = useState(49.2827);
  const [zoom, setZoom] = useState(9);


  function onMapClick(e) {
    console.log(e);
    setLng(e.lngLat.lng.toFixed(6));
    setLat(e.lngLat.lat.toFixed(6));

    tempMarker.current
      .setLngLat([e.lngLat.lng, e.lngLat.lat])
      .addTo(map.current);
    geocoder.current.clear();
  };

  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/outdoors-v11',
      center: [lng, lat],
      zoom: zoom
    });
    console.log('MAP CURRENT ', map.current);
  }, [map, lng, lat, zoom]);

  // useEffect(() => {
  //   if (!map.current) return; // wait for map to initialize
  //   map.current.on('move', () => {
  //     setLng(map.current.getCenter().lng.toFixed(4));
  //     setLat(map.current.getCenter().lat.toFixed(4));
  //     setZoom(map.current.getZoom().toFixed(2));
  //   });
  // });

  useEffect(() => {
    map.current.on('click', e => onMapClick(e));
  }, [map, geocoder]);

  useEffect(() => {
    if (geocoder.current) return;
    geocoder.current = new MapboxGeocoder({
      accessToken: mapboxgl.accessToken,
      marker: {
      color: 'orange'
      },
      mapboxgl: mapboxgl
      });
       
    map.current.addControl(geocoder.current);
    geocoder.current.on('result', e => {
      setLng(e.result.center[0]);
      setLat(e.result.center[1]);
      setZoom(map.current.getZoom().toFixed(2));
      tempMarker.current.remove();
      console.log(e.result.center);
      console.log(geocoder.current.mapMarker);
    })

  }, [map, geocoder, tempMarker])

  return (
      <div ref={mapContainer} className="map-container">
        <div className="sidebar">
          Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
        </div>
      </div>
  );
}