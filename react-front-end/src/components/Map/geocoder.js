import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';


export default function Geocoder(props) {
  // const mapContainer = useRef(null);
  // const map = useRef(null);
  const geocoder = useRef(null);
  // const [lng, setLng] = useState(-123.1207);
  // const [lat, setLat] = useState(49.2827);
  // const [zoom, setZoom] = useState(9);
  const { map, setLng, setLat, setZoom } = props

  // useEffect(() => {
  //   if (map.current) return; // initialize map only once
  //   map.current = new mapboxgl.Map({
  //     container: mapContainer.current,
  //     style: 'mapbox://styles/mapbox/outdoors-v11',
  //     center: [lng, lat],
  //     zoom: zoom
  //   });
  // });

  // useEffect(() => {
  //   if (!map.current) return; // wait for map to initialize
  //   map.current.on('move', () => {
  //     setLng(map.current.getCenter().lng.toFixed(4));
  //     setLat(map.current.getCenter().lat.toFixed(4));
  //     setZoom(map.current.getZoom().toFixed(2));
  //   });
  // });
  // console.log('entries MAP ', Object.entries( map))
  // console.log('keys MAP ', Object.keys(map))
  // console.log('values MAP ', Object.values(map))
  // console.log('PROPS ', props)
  // console.log('PROPS map ', props['map'])
  console.log(map);


  useEffect(() => {
    if (geocoder.current) return;
    if (map.current){
          geocoder.current = new MapboxGeocoder({
      accessToken: mapboxgl.accessToken,
      marker: {
      color: 'orange'
      },
      mapboxgl: mapboxgl
      });
    // console.log('typeof PROPS MAP ', props.map);
    // map.current.on('load', (e) => {
    //   console.log('EVENT', e);
    //   console.log('map.current ', map.current);
    // })
    // console.log('MAP ', map);
    // console.log('MAP CURRENT', map.current);
    map.current.addControl(geocoder.current);
    geocoder.current.on('result', e => {
      setLng(e.result.center[0].toFixed(4));
      setLat(e.result.center[1].toFixed(4));
      setZoom(map.current.getZoom().toFixed(2));
      console.log(e.result.center);
      console.log(geocoder.current.mapMarker);
      // geocoder.current.clear();
    })  } 
  }, [map, geocoder])
  


  return (
        <div id="geocoder"></div>
  );
}