import React, { useRef, useEffect, useState, useContext } from 'react';
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import './LocationForm.css';
import { Button } from '@material-ui/core';
import { multiStepsContext } from '../Form/StepContext';
import Toggle from './Toggle';
import axios from 'axios';

mapboxgl.accessToken = 'pk.eyJ1IjoiYWNlZmxhbmtlciIsImEiOiJja3RudjFrZDEwNmxxMnVwbWs5aW85eGVyIn0.j-do5McYg-VrWM4qQmAIKg';

export default function LocationForm(props) {

  const { setStep, userData, setUserData } = useContext(multiStepsContext)
  const mapContainer = useRef(null);
  const map = useRef(null);
  const geocoder = useRef(null);
  const tempMarker = useRef(null);

  const [lng, setLng] = useState(null);
  const [lat, setLat] = useState(null);
  const [zoom, setZoom] = useState(9);

  const [recommendations, setRecommendations] = useState([])
  const [planned, setPlanned] = useState([])
  const [completedTrips, setCompletedTrips] = useState([])
  const [mapLists, setMapLists] = useState([])


  const mapboxCap = function(lat, lon) {
    return `https://api.mapbox.com/styles/v1/mapbox/outdoors-v11/static/${lon},${lat},15,0/600x600?access_token=${process.env.REACT_APP_MAPBOX_API_KEY}`;
  }


  const user_id = localStorage.getItem('user_id');

  useEffect(() => {
    axios.get('/api/recommendations')
      .then((res) => {
        // setRecommendations(res.data)
        setRecommendations(res.data)
        console.log("001 data API:", res.data)


      })
  }, [])

  useEffect(() => {
    axios.get(`/api/trips/planned/${user_id}`
    ).then((response) => {
      setPlanned(response.data)
    })
  }, [])

  useEffect(() => {
    axios.get(`/api/trips/completed/${user_id}`).then((response) => {
      setCompletedTrips(response.data)
    })
  }, [])


  useEffect(() => {
    const tripData = {};
    axios.get(`/api/trips/completed/${user_id}`)
      .then((res) => {
        tripData.completedTrips = res.data;
        axios.get(`/api/trips/planned/${user_id}`)
          .then((ress) => {
            tripData.plannedTrips = ress.data;
            axios.get('/api/recommendations')
              .then((resss) => {
                tripData.recommendations = resss.data;
                setMapLists(tripData);
              })
          })
      })
  }, [])


  const markerGroup = useRef([]);
  const recommendation = useRef(recommendations);

  const [mapList, setMapList] = useState(null);

  const loadMarkers = function(list) {
    removeMarkers();
    for (const marker of list) {
      markerGroup.current.push(new mapboxgl.Marker({
        color: 'orange'
      })
        .setLngLat([marker.longitude, marker.latitude])
        .setPopup(new mapboxgl.Popup({ className: "pop-up-main", closeButton: false }).setHTML(`
       <div >
            <div class="pop-up-img">
              <img src=${marker.image}>
            </div>
            <div class="pop-up-title">
              <p id="popTitle">${marker.title}</p>
              <p id="popDesc">${marker.description}</p>
            </div>
        </div>
        `))
        .addTo(map.current)
      );
    }
    for (const marker of markerGroup.current) {
      marker.getElement().addEventListener('click', e => {
        e.stopPropagation();
        if (tempMarker.current && tempMarker.current.getPopup().isOpen()) tempMarker.current.togglePopup();
        removePopups();
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
    if (tempMarker.current && !tempMarker.current.getPopup().isOpen()) {
      setLng(null);
      setLat(null);
    };
    markerGroup.current.splice(0, markerGroup.current.length);
  };

  const removePopups = function() {
    for (let marker of markerGroup.current) {
      if (marker.getPopup().isOpen()) {
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
      .setPopup(new mapboxgl.Popup({ className: "pop-up-main", closeButton: false }).setHTML(`
      <div >
            <div class="pop-up-img">
              <img src="${mapboxCap(e.lngLat.lat, e.lngLat.lng)}">
            </div>
            <div class="pop-up-title">
              <p id="popTitle">Your next adventure!</p>
              <p id="popDesc">longitude: ${e.lngLat.lng}</p>
              <p id="popDesc">latitude: ${e.lngLat.lng}</p>
            </div>
        </div>
      `))
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
      center: [-123.1207, 49.2827],
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
      limit: 10,
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
        .setPopup(new mapboxgl.Popup({ className: "pop-up-main", closeButton: false }).setHTML(`
        <div >
          <div class="pop-up-img">
            <img src="${mapboxCap(e.result.center[1], e.result.center[0])}">
          </div>
          <div class="pop-up-title">
            <p id="popTitle">Your next adventure!</p>
            <p id="popDesc">longitude: ${e.result.center[1]}</p>
            <p id="popDesc">latitude: ${e.result.center[0]}</p>
          </div>
        </div>
        `))
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
        // minZoom: 22,
        // curve: 1,
        zoom: map.current.getZoom().toFixed(4),
        center: [e.result.center[0], e.result.center[1]],
        around: [e.result.center[0], e.result.center[1]]
      })
    })
  }, [map, geocoder, tempMarker, zoom, setZoom])

  const handleNext = () => {
    setUserData({ ...userData, "latitude": lat, "longitude": lng })
    setStep(2)
  }

  return (
    <>
      <div ref={mapContainer} className="map-container">
        <Toggle setMapList={setMapList} mapLists={mapLists}></Toggle>
        <div className="step-counter">
          {props.children}
        </div>
        <div className={(!lng ? "location-prompt" : null)}>
          {!lng && 'Please select or choose a location'}
        </div>
        <div className="form-button">
          <Button
            variant="contained"
            color="primary"
            onClick={lng ? handleNext : null}
          >
            Next
          </Button>
        </div>
      </div>
    </>
  );
}