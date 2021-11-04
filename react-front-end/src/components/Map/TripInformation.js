import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import moment from 'moment';
import TripButtons from './TripButtons';
import axios from 'axios';


// creator_id, title, description, activity, start_date, end_date, longitude, latitude, image

const InformationContainer = styled.div`
  background-color: #F3F5FA;
  position: absolute;
  width: 22rem;
  top: 14vh;
  bottom: 14vh;
  right: 10vw;
  z-index: 1;
  box-shadow: 2px 2px 7px 0px rgb(166, 166, 166);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  border-radius: 5px;
`;

const TripImage = styled.div`
  border-radius: 13px;
  margin: 1.6rem;
  margin-bottom: 0.8rem;
  background-image: url(${props => props.image});
  background-size: cover;
  height: 28%;
  box-shadow: 1px 2px 8px 2px rgb(166, 166, 166);
  display: flex;
  flex-direction: column;
  `;
  // justify-content: flex-end;
  // align-items: flex-end;
  
const TripTitle = styled.span`

  font-size: 1.5rem;
  line-height: 2.2rem;
  width: auto;
  height: auto;
  padding: 0.8rem 1.6rem;
  padding-bottom: 1.6rem;
  weight: 500;
  text-shadow:  2px 1px 4px grey;
  border-bottom: 1px solid lightgrey;
`;
const TripDate = styled.div`
  margin: 0.8rem 1.6rem;
  margin-top: 1.6rem;
  font-size: 1rem;
  color: grey;
  &.empty-date-activity {
    display: none;
  }
`;

const TripActivity = styled.span`
  vertical-align: middle;
  display: inline-block;
  margin: 0rem 0.3rem;
  padding: 0.1rem 0.4rem; 
  border-radius: 10px;
  color: white;
  font-size: 0.7rem;
  font-weight: 600;
  text-shadow: none;
  &.hiking {
    background-color: green;
  }
  &.backpacking {
    background-color: blue;
  }
  &.camping {
    background-color: orange;
  }
`;

const TripDescription = styled.div`
  margin: 0.8rem 1.6rem;
  font-size: 1rem;
  line-height: 1.5rem;
  `;
  // overflow: hidden;
  // text-overflow: ellipsis;
  
const TripCoordinates = styled.div`
  padding: 0.8rem 1.6rem;
  padding-bottom: 1.6rem;
  padding-top: 0;
  color: grey;
  font-size: 0.9rem;
  line-height: 1.5rem;
  border-bottom: 1px solid lightgrey;
`;

const FriendAvatar = styled.img`
  height: 1.8rem;
  border: 2px solid skyblue;
  border-radius: 45px;
  margin-left: 0.4rem;
  display: inline-block;
  src: ${props => props.avatar};
`;

// const tempTrip = {
//   creator_id: 1,
//   title: 'Grouse Mountain and Stanley Park',
//   description: 'Devonian Harbour Park to Harbour Green Park is a 2.6 kilometer moderately trafficked out and back trail located near Vancouver, British Columbia, Canada that offers scenic views and is good for all skill levels. The trail is primarily used for hiking, walking, running, and bird watching and is best used from May until September. Dogs are also able to use this trail but must be kept on leash.',
//   activity: 'backpacking',
//   start_date: '2021-11-4',
//   end_date: '2021-11-5',
//   longitude: -123.1207,
//   latitude: 49.2827,
//   image: '/images/trip1.jpg'
// }

export default function TripInformation(props) {

  const [checkListed, setCheckListed] = useState(false);
  const [friendAvatarURL, setFriendAvatarURL] = useState(false);

  
  const {currentTrip, setCurrentTrip} = props;
  
  // const {
  //   id,
  //   creator_id,
  //   title,
  //   description,
  //   activity,
  //   start_date,
  //   end_date,
  //   longitude,
  //   latitude,
  //   image
  // } = currentTrip;

  const currentUserID = Number(localStorage.getItem('user_id'));
  

  useEffect(() => {
    if (!currentTrip) return;
    if (!currentTrip.id || (currentTrip.id && currentTrip.creator_id !== currentUserID)) return setCheckListed(false);
    console.log('well')
    axios.get(`/api/calendar/userGearList/${currentTrip.id}`)
    .then(res => {
      if(res.data.length && res.data.length !== 0) return setCheckListed(true);
      setCheckListed(false);
    })
  }, [props.currentTrip, currentTrip])
  
  
  useEffect(() => {
    if (!currentTrip) return;
    if(!currentTrip.creator_id || currentUserID === currentTrip.creator_id) return setFriendAvatarURL(false);
    axios.get(`/api/users/avatar/${currentTrip.creator_id}`)
      .then(res => {
        setFriendAvatarURL(res.data[0].avatar);
      })
  }, [props.currentTrip, currentTrip])

  const mapboxCap = function(trip) {
    return `https://api.mapbox.com/styles/v1/mapbox/outdoors-v11/static/${currentTrip.longitude},${currentTrip.latitude},14,0/600x600?access_token=${process.env.REACT_APP_MAPBOX_API_KEY}`;
  }

  // const [currentTrip, setCurrentTrip] = useState(null);

  // useEffect(() => {
  //   setCurrentTrip({...props.currentTrip});
  // }, [props.currentTrip]);
  

  // function cancel() {
  //   transition(DELETING, true);
  //   props.cancelInterview(props.id)
  //     .then(() => transition(EMPTY))
  //     .catch(() => transition(ERROR_DELETE, true));
  // }

  return (
    <>
      {currentTrip && currentTrip.length !== 0 &&
        (<InformationContainer>
        <TripImage image={currentTrip.image || mapboxCap(currentTrip)} >

        </TripImage>
        <TripTitle>
          {currentTrip.title}
          {friendAvatarURL && <FriendAvatar src={friendAvatarURL}></FriendAvatar>}
        </TripTitle>
        
        <TripDate className={(!currentTrip.start_date && !currentTrip.activity ? 'empty-date-activity' : null)}>
          {/*  A reminder to improve date range display with no repeating elements, when it's the same month or year */}
          {currentTrip.start_date && moment(currentTrip.start_date).format("MMM DD, YYYY") + (currentTrip.start_date !== currentTrip.end_date && ' - ' + moment(currentTrip.end_date).format("MMM DD, YYYY"))}
          {currentTrip.activity && <TripActivity className={currentTrip.activity}>{currentTrip.activity}</TripActivity>}
        </TripDate>
        <TripDescription>{currentTrip.description}</TripDescription>
        <TripCoordinates>
          <span style={{color: '#668fff'}}>Latitude</span>&nbsp;&nbsp;{currentTrip.latitude && currentTrip.latitude}
          <br />
          <span style={{color: '#668fff'}}>Longitude</span>&nbsp;&nbsp;{currentTrip.longitude && currentTrip.longitude}
        </TripCoordinates>
        <TripButtons setCurrentTrip={props.setCurrentTrip} currentTrip={props.currentTrip} latitude={currentTrip.latitude} longitude={currentTrip.longitude} tripID={currentTrip.id} checkListed={checkListed} friendAvatarURL={friendAvatarURL}></TripButtons>
        </InformationContainer>)
      }
    </>
  )
}