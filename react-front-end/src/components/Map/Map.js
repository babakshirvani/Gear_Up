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
  const tempMarker = useRef(null);

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

  const loadMarkers = function(list) {
    removeMarkers();
    for (const marker of list.current) {
      markerGroup.current.push(new mapboxgl.Marker({
        color: 'orange'
      })
        .setLngLat(marker.coordinates)
        .setPopup(new mapboxgl.Popup().setHTML(`<h1>${marker.name}</h1>`))
        .addTo(map.current)
      );
    }
    for (const marker of markerGroup.current) {
      marker.getElement().addEventListener('click', e => {
        e.stopPropagation();
        if (tempMarker.current && tempMarker.current.getPopup().isOpen()) tempMarker.current.togglePopup();
        removePopups(marker);
        marker.togglePopup();
        setLng(marker.getLngLat().lng);
        setLat(marker.getLngLat().lat);
      });
    }
  }
  const removeMarkers = function() {
    for (let marker of markerGroup.current) {
      marker.remove();
    }
    markerGroup.current.splice(0, markerGroup.current.length);
  };

  const removePopups = function() {
    for (let marker of markerGroup.current) {
      if(marker.getPopup().isOpen()) {
        marker.togglePopup();
      };
    }
  }

  const onMapClick = function(e) {
    // removeMarkers();
    removePopups();
    setLng(e.lngLat.lng.toFixed(6));
    setLat(e.lngLat.lat.toFixed(6));
    if (tempMarker.current) tempMarker.current.remove();
    tempMarker.current = new mapboxgl.Marker()
      .setLngLat([e.lngLat.lng, e.lngLat.lat])
      .setPopup(new mapboxgl.Popup().setHTML(`<h1>New Trip</h1>`))
      .addTo(map.current)
      .togglePopup();
    tempMarker.current.getElement().addEventListener('click', event => {
      event.stopPropagation();
      removePopups();
      if (!tempMarker.current.getPopup().isOpen()) tempMarker.current.togglePopup();
      setLng(tempMarker.current.getLngLat().lng.toFixed(6));
      setLat(tempMarker.current.getLngLat().lat.toFixed(6));
    });
  };

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
  //     loadMarkers(mapList);
  //   })
  // }, [map])
  
  useEffect(() => {
    removeMarkers();
    if (!mapList) return;
    loadMarkers(mapList);
  }, [mapList])

  useEffect(() => {
    if (!map.current) return; // wait for map to initialize
    map.current.on('move', () => {
      setZoom(map.current.getZoom().toFixed(4));
    });
  }, [map, zoom]);

  useEffect(() => {
    map.current.on('click', e => {
      // setMapList(null);
      onMapClick(e);
    });
  }, [map, geocoder, tempMarker]);

  useEffect(() => {
    if (geocoder.current) return;
    geocoder.current = new MapboxGeocoder({
      flyTo: false,
      accessToken: mapboxgl.accessToken,
      marker: {
      color: 'orange',
      },
      mapboxgl: mapboxgl
      });

    map.current.addControl(geocoder.current);
    geocoder.current.on('result', e => {
      removePopups();
      geocoder.current.clear();
      setLng(e.result.center[0]);
      setLat(e.result.center[1]);
      setZoom(map.current.getZoom().toFixed(4));
      if (tempMarker.current) tempMarker.current.remove();
      tempMarker.current = new mapboxgl.Marker()
        .setLngLat([e.result.center[0], e.result.center[1]])
        .setPopup(new mapboxgl.Popup().setHTML(`<h1>New Trip</h1>`))
        .addTo(map.current)
        .togglePopup();
      tempMarker.current.getElement().addEventListener('click', event => {
        event.stopPropagation();
        removePopups();
        if (!tempMarker.current.getPopup().isOpen()) tempMarker.current.togglePopup();
        setLng(tempMarker.current.getLngLat().lng.toFixed(6));
        setLat(tempMarker.current.getLngLat().lat.toFixed(6));
       });
       map.current.flyTo({
        minZoom: 22,
        curve: 1,
        zoom: map.current.getZoom().toFixed(4),
        center: [e.result.center[0], e.result.center[1]],
        around: [e.result.center[0], e.result.center[1]]
      })
    })
  }, [map, geocoder, tempMarker, zoom, setZoom])

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