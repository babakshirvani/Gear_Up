import React, { useRef, useEffect, useState, useContext } from 'react';
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import './LocationForm.css';
import Toggle from './Toggle';
import axios from 'axios';
import TripInformation from './TripInformation';
import $ from 'jquery';
mapboxgl.accessToken = 'pk.eyJ1IjoiYWNlZmxhbmtlciIsImEiOiJja3RudjFrZDEwNmxxMnVwbWs5aW85eGVyIn0.j-do5McYg-VrWM4qQmAIKg';


export default function Trips(props) {

  // const { setStep, userData, setUserData } = useContext(multiStepsContext)
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
  const [currentTrip, setCurrentTrip] = useState([])

  const mapboxCap = function(lat, lon) {
    return `https://api.mapbox.com/styles/v1/mapbox/outdoors-v11/static/${lon},${lat},15,0/600x600?access_token=${process.env.REACT_APP_MAPBOX_API_KEY}`;
  }


  const user_id = localStorage.getItem('user_id');

  useEffect(() => {
    axios.get('/api/recommendations')
      .then((res) => {
        setRecommendations(res.data)
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
  }, [currentTrip])

  const markerGroup = useRef([]);
  const recommendation = useRef(recommendations);
  const [mapList, setMapList] = useState(null);

  const loadMarkers = function(list) {

    removeMarkers();
    for (const trip of list) {
      markerGroup.current.push(new mapboxgl.Marker({
        color: 'orange'
      })
        .setLngLat([trip.longitude, trip.latitude])
        .setPopup(new mapboxgl.Popup({ className: "pop-up-main", closeButton: false }).setHTML(`
        <div >
             <div class="pop-up-img">
               <img src=${trip.image || mapboxCap(trip.latitude, trip.longitude)}>
             </div>
             <div class="pop-up-title">
               <p id="popTitle">${trip.title}</p>
               <p id="popDesc">${trip.description || ""}</p>
             </div>
         </div>
         `))
        .addTo(map.current)
      );
    }
    markerGroup.current.forEach((marker, index) => {

      marker.getElement().addEventListener('click', e => {
        e.stopPropagation();
        if (tempMarker.current && tempMarker.current.getPopup().isOpen()) tempMarker.current.togglePopup();
        removePopups();
        marker.togglePopup();
        setLng(marker.getLngLat().lng);
        setLat(marker.getLngLat().lat);
        setCurrentTrip(list[index]);
      });
    })

    // for (const marker of markerGroup.current) {
    //   console.log('wtf', list[index]);
    //   marker.getElement().addEventListener('click', e => {
    //     e.stopPropagation();
    //     if (tempMarker.current && tempMarker.current.getPopup().isOpen()) tempMarker.current.togglePopup();
    //     removePopups();
    //     marker.togglePopup();
    //     setLng(marker.getLngLat().lng);
    //     setLat(marker.getLngLat().lat);
    //     console.log('list index', list);
    //     console.log('list index', list[1]);
    //     console.log('list index', typeof list, Array.isArray(list));
    //     setCurrentTrip(list[index]);
    //   });
    // }
  }

  const removeMarkers = function() {
    for (let marker of markerGroup.current) {
      marker.remove();
    }
    if (tempMarker.current) tempMarker.current.remove();
    markerGroup.current.splice(0, markerGroup.current.length);
  };

  const removePopups = function() {
    for (let marker of markerGroup.current) {
      if (marker.getPopup().isOpen()) {
        marker.togglePopup();
      };
    }
  }

  useEffect(() => {
    if (map.current) return; // initialize map only once

    if (props.tripID) {
      axios.get(`/api/trips/${props.tripID}`)
        .then(res => {
          const {
            creator_id,
            title,
            description,
            activity,
            start_date,
            end_date,
            longitude,
            latitude,
            image
          } = res.data[0];
          map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/mapbox/outdoors-v11',
            center: [longitude, latitude],
            zoom: zoom
          });
          setCurrentTrip({ ...res.data[0] });
          removePopups();
          setLng(longitude);
          setLat(latitude);
          setZoom(map.current.getZoom().toFixed(4));
          if (tempMarker.current) tempMarker.current.remove();
          tempMarker.current = new mapboxgl.Marker()
            .setLngLat([longitude, latitude])
            .setPopup(new mapboxgl.Popup({ className: "pop-up-main", closeButton: false }).setHTML(`
            <div >
                 <div class="pop-up-img">
                   <img src=${image || mapboxCap(latitude, longitude)}>
                 </div>
                 <div class="pop-up-title">
                   <p id="popTitle">${title}</p>
                   <p id="popDesc">${description || ""}</p>
                 </div>
             </div>
             `))
            .addTo(map.current)
            .togglePopup();
          // tempMarker.current.getElement().addEventListener('click', event => {
          //   event.stopPropagation();
          //   if (tempMarker.current && tempMarker.current.getPopup().isOpen()) tempMarker.current.togglePopup();
          //   removePopups();
          //   setLng(longitude);
          //   setLat(latitude);
          // });
        })
          .catch(res => {
            map.current = new mapboxgl.Map({
              container: mapContainer.current,
              style: 'mapbox://styles/mapbox/outdoors-v11',
              center: [-123.1207, 49.2827],
              zoom: zoom
            });
          })
      return;
    }
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/outdoors-v11',
      center: [-123.1207, 49.2827],
      zoom: zoom
    });
  }, [map, lng, lat, zoom]);
  
  // useEffect(() => {
  //   if (map.current) return; // initialize map only once

  //   if (props.tripID) {
  //     $.get(`/api/trips/${props.tripID}`)
  //       .then(res => {
  //         const {
  //           creator_id,
  //           title,
  //           description,
  //           activity,
  //           start_date,
  //           end_date,
  //           longitude,
  //           latitude,
  //           image
  //         } = res.data[0];
  //         map.current = new mapboxgl.Map({
  //           container: mapContainer.current,
  //           style: 'mapbox://styles/mapbox/outdoors-v11',
  //           center: [longitude, latitude],
  //           zoom: zoom
  //         });
  //         setCurrentTrip({ ...res.data[0] });
  //         removePopups();
  //         setLng(longitude);
  //         setLat(latitude);
  //         setZoom(map.current.getZoom().toFixed(4));
  //         if (tempMarker.current) tempMarker.current.remove();
  //         tempMarker.current = new mapboxgl.Marker()
  //           .setLngLat([longitude, latitude])
  //           .setPopup(new mapboxgl.Popup({ className: "pop-up-main", closeButton: false }).setHTML(`
  //           <div >
  //                <div class="pop-up-img">
  //                  <img src=${image || mapboxCap(latitude, longitude)}>
  //                </div>
  //                <div class="pop-up-title">
  //                  <p id="popTitle">${title}</p>
  //                  <p id="popDesc">${description || ""}</p>
  //                </div>
  //            </div>
  //            `))
  //           .addTo(map.current)
  //           .togglePopup();
  //         tempMarker.current.getElement().addEventListener('click', event => {
  //           event.stopPropagation();
  //           if (tempMarker.current && tempMarker.current.getPopup().isOpen()) tempMarker.current.togglePopup();
  //           removePopups();
  //           setLng(longitude);
  //           setLat(latitude);
  //         });
  //       })
  //         .catch(res => {
  //           map.current = new mapboxgl.Map({
  //             container: mapContainer.current,
  //             style: 'mapbox://styles/mapbox/outdoors-v11',
  //             center: [-123.1207, 49.2827],
  //             zoom: zoom
  //           });
  //         })
  //     return;
  //   }
  //   map.current = new mapboxgl.Map({
  //     container: mapContainer.current,
  //     style: 'mapbox://styles/mapbox/outdoors-v11',
  //     center: [-123.1207, 49.2827],
  //     zoom: zoom
  //   });
  // }, [map, lng, lat, zoom]);

  useEffect(() => {
    removeMarkers();
    setCurrentTrip(null);
    if (!mapList) return;
    loadMarkers(mapList);
  }, [mapList])
  
  useEffect(() => {
    if (tempMarker.current && currentTrip === null) tempMarker.current.remove();
    if (markerGroup.current && !currentTrip) {
      console.log('marker', markerGroup);
      markerGroup.current.forEach(marker => {
        console.log(marker);
        if (marker.getPopup().isOpen()) marker.remove();
      })
    }
  }, [currentTrip, mapList])
  
  useEffect(() => {
    if (!map.current) return; // wait for map to initialize
    map.current.on('move', () => {
      setZoom(map.current.getZoom().toFixed(4));
    });
  }, [map, zoom]);


  useEffect(() => {
    if (!map.current) return;
    map.current.on('load', () => {
      if (mapLists.length === 0 || props.tripID) return;
      loadMarkers(mapLists.plannedTrips);
    })
  }, [map, mapLists])
  // useEffect(() => {
  //   map.current.on('load', () => {
  //     if (props.tripID) {
  //       axios.get(`/api/trips/${props.tripID}`)
  //         .then(res => {
  //           const {
  //             creator_id,
  //             title,
  //             description,
  //             activity,
  //             start_date,
  //             end_date,
  //             longitude,
  //             latitude,
  //             image
  //           } = res.data[0];
  //           map.current = new mapboxgl.Map({
  //             container: mapContainer.current,
  //             style: 'mapbox://styles/mapbox/outdoors-v11',
  //             center: [longitude, latitude],
  //             zoom: zoom
  //           });
  //           setCurrentTrip({...res.data[0]});
  //           removePopups();
  //           setLng(longitude);
  //           setLat(latitude);
  //           setZoom(map.current.getZoom().toFixed(4));
  //           if (tempMarker.current) tempMarker.current.remove();
  //           tempMarker.current = new mapboxgl.Marker()
  //             .setLngLat([longitude, latitude])
  //             .setPopup(new mapboxgl.Popup().setHTML(`<h1>${title}</h1>`))
  //             .addTo(map.current)
  //             .togglePopup();
  //           tempMarker.current.getElement().addEventListener('click', event => {
  //             event.stopPropagation();
  //             if (tempMarker.current && tempMarker.current.getPopup().isOpen()) tempMarker.current.togglePopup();
  //             removePopups();
  //             setLng(longitude);
  //             setLat(latitude);
  //           });
  //           // map.current.jumpTo({
  //           //   // minZoom: 22,
  //           //   // curve: 1,
  //           //   zoom: map.current.getZoom().toFixed(4),
  //           //   center: [longitude, latitude],
  //           //   around: [longitude, latitude]
  //           // })
  //         })
  //     }
  //   })
  // }, [map])

  return (
    <>
      <div ref={mapContainer} className="map-container">
        <Toggle setMapList={setMapList} mapLists={mapLists}></Toggle>
        <TripInformation currentTrip={currentTrip} setCurrentTrip={setCurrentTrip} />
        {/* <div className="step-counter">
          {props.children}
        </div> */}
        {/* <div className={(!lng ? "location-prompt" : null)}>
          {!lng && 'Please select or choose a location'}
        </div> */}
      </div>
    </>
  );
}

  // const onMapClick = function(e) {
  //   // removeMarkers();
  //   removePopups();
  //   setLng(e.lngLat.lng.toFixed(6));
  //   setLat(e.lngLat.lat.toFixed(6));
  //   if (tempMarker.current) tempMarker.current.remove();
  //   tempMarker.current = new mapboxgl.Marker()
  //     .setLngLat([e.lngLat.lng, e.lngLat.lat])
  //     .setPopup(new mapboxgl.Popup().setHTML(`<h1>New Trip</h1>`))
  //     .addTo(map.current)
  //     .togglePopup();
  //   tempMarker.current.getElement().addEventListener('click', event => {
  //     event.stopPropagation();
  //     removePopups();
  //     if (!tempMarker.current.getPopup().isOpen()) tempMarker.current.togglePopup();
  //     setLng(tempMarker.current.getLngLat().lng.toFixed(6));
  //     setLat(tempMarker.current.getLngLat().lat.toFixed(6));
  //   });
  // };






  // useEffect(() => {
  //   map.current.on('click', e => {
  //     // setMapList(null);
  //     onMapClick(e);
  //   });
  // }, [map, geocoder, tempMarker]);

  // useEffect(() => {
  //   if (geocoder.current) return;
  //   geocoder.current = new MapboxGeocoder({
  //     limit: 10,
  //     flyTo: false,
  //     accessToken: mapboxgl.accessToken,
  //     marker: {
  //       color: 'orange',
  //     },
  //     mapboxgl: mapboxgl
  //   });

  //   map.current.addControl(geocoder.current);
  //   geocoder.current.on('result', e => {
  //     removePopups();
  //     geocoder.current.clear();
  //     setLng(e.result.center[0]);
  //     setLat(e.result.center[1]);
  //     setZoom(map.current.getZoom().toFixed(4));
  //     if (tempMarker.current) tempMarker.current.remove();
  //     tempMarker.current = new mapboxgl.Marker()
  //       .setLngLat([e.result.center[0], e.result.center[1]])
  //       .setPopup(new mapboxgl.Popup().setHTML(`<h1>New Trip</h1>`))
  //       .addTo(map.current)
  //       .togglePopup();
  //     tempMarker.current.getElement().addEventListener('click', event => {
  //       event.stopPropagation();
  //       removePopups();
  //       if (!tempMarker.current.getPopup().isOpen()) tempMarker.current.togglePopup();
  //       setLng(tempMarker.current.getLngLat().lng.toFixed(6));
  //       setLat(tempMarker.current.getLngLat().lat.toFixed(6));
  //     });
  //     map.current.flyTo({
  //       // minZoom: 22,
  //       // curve: 1,
  //       zoom: map.current.getZoom().toFixed(4),
  //       center: [e.result.center[0], e.result.center[1]],
  //       around: [e.result.center[0], e.result.center[1]]
  //     })
  //   })
  // }, [map, geocoder, tempMarker, zoom, setZoom])

  // const handleNext = () => {
  //   setUserData({ ...userData, "latitude": lat, "longitude": lng })
  //   setStep(2)
  // }

