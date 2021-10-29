import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import './Map.css';
import $ from 'jquery';
import Toggle from './Toggle';

mapboxgl.accessToken = 'pk.eyJ1IjoiYWNlZmxhbmtlciIsImEiOiJja3RudjFrZDEwNmxxMnVwbWs5aW85eGVyIn0.j-do5McYg-VrWM4qQmAIKg';

export default function Map(props) {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const geocoder = useRef(null);
  const tempMarker = useRef(new mapboxgl.Marker());

  const [lng, setLng] = useState(-123.1207);
  const [lat, setLat] = useState(49.2827);
  const [zoom, setZoom] = useState(9);

  const recommendations = [
    {
      name: 'Burnaby Mountain',
      coordinates: [-122.922769, 49.275085]
    },
    {
      name: 'Vancouver',
      coordinates: [-123.063022, 49.271501]
    },
    {
      name: 'Richmond',
      coordinates: [-123.098537, 49.151771]
    }
  ];
  const myTrips = [
    {
      name: 'Grouse Mountain',
      coordinates: [-123.077422, 49.383992]
    }
  ];
  const markerGroup = useRef([]);
  const recommendation = useRef(recommendations);
  const myTrip = useRef(myTrips);
  const mapLists = {
    recommendation,
    myTrip
  }
  const [mapList, setMapList] = useState(null);

  // const stopMarkerPropagation = function() {
  //   $('.mapboxgl-marker').on('click', e => e.stopPropagation());
  // }
  // const stopMapPropagation = function() {
  //   $('.map-container').on('click', e => e.stopPropagation());
  // }
  
  const loadMarkers = function(list) {
    removeMarkers();
    for (const marker of list.current) {
      markerGroup.current.push(new mapboxgl.Marker()
      .on('render', (e) => {console.log('test')})
        .setLngLat(marker.coordinates)
        .setPopup(new mapboxgl.Popup().setHTML(`<h1>${marker.name}</h1>`))
        .addTo(map.current)
      );
    for (const marker of markerGroup.current) {
      $('.mapboxgl-marker').on('click', e => console.log(e));
    }
    }
    // stopMarkerPropagation();
  }

  const removeMarkers = function() {
    for (let marker of markerGroup.current) {
      marker.remove();
    }
    markerGroup.current.splice(0, markerGroup.current.length);
  };

  const onMapClick = function(e) {
    removeMarkers();
    console.log('Current Click Coords', e);
    setLng(e.lngLat.lng.toFixed(6));
    setLat(e.lngLat.lat.toFixed(6));

    tempMarker.current
      .setLngLat([e.lngLat.lng, e.lngLat.lat])
      .addTo(map.current);
    // geocoder.current.clear();

  };

  // function toggleChange() {
  //   document.getElementById('listing-group').addEventListener('change', (e) => {
  //       const handler = e.target.id;
  //       if (e.target.checked) {
  //       map.current[handler].enable();
  //       } else {
  //       map.current[handler].disable();
  //       }
  //       });
  //   }

  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/outdoors-v11',
      center: [lng, lat],
      zoom: zoom
    });
  }, [map, lng, lat, zoom]);

  // useEffect(() => {
  //   map.current.on('load', () => {
  //     // loadMarkers(mapList);
  //     stopMapPropagation();
  //   })
  // }, [map])
  
  useEffect(() => {
    removeMarkers();
    if (!mapList) return;
    loadMarkers(mapList);
  }, [mapList])


  // useEffect(() => {
  //   if (!map.current) return; // wait for map to initialize
  //   map.current.on('move', () => {
  //     setLng(map.current.getCenter().lng.toFixed(4));
  //     setLat(map.current.getCenter().lat.toFixed(4));
  //     setZoom(map.current.getZoom().toFixed(2));
  //   });
  // });

  // useEffect(() => {
  //   map.current.on('click', e => {
  //     setMapList(null);
  //     onMapClick(e);
  //   });
  //   map.current.on('click', 'layer_1', e => {
  //     e.originalEvent.preventDefault();
  //   });
  // }, [map, geocoder]);

  // Creating the map object
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
    })
  }, [map, geocoder, tempMarker])


  return (
    <>
      <div ref={mapContainer} className="map-container">
      <Toggle setMapList={setMapList} mapLists={mapLists}></Toggle>
        <div className="sidebar">
          Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
        </div>
      </div>
    </>
  );
}