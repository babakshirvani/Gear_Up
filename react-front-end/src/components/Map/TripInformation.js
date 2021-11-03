import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import moment from 'moment';
import TripButtons from './TripButtons';

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
  } = props.currentTrip;

  const mapboxCap = function(trip) {
    return `https://api.mapbox.com/styles/v1/mapbox/outdoors-v11/static/${trip.longitude},${trip.latitude},14,0/600x600?access_token=${process.env.REACT_APP_MAPBOX_API_KEY}`;
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

      {!Array.isArray(props.currentTrip) &&
        (<InformationContainer>
        <TripImage image={image || mapboxCap(props.currentTrip)} />
        <TripTitle>{title}</TripTitle>
        <TripDate className={(!start_date && !activity ? 'empty-date-activity' : null)}>
          {/*  A reminder to improve date range display with no repeating elements, when it's the same month or year */}
          {start_date && moment(start_date).format("MMM DD, YYYY") + (start_date !== end_date && ' - ' + moment(end_date).format("MMM DD, YYYY"))}
          {activity && <TripActivity className={activity}>{activity}</TripActivity>}
        </TripDate>
        <TripDescription>{description}</TripDescription>
        <TripCoordinates>
          <span style={{color: '#668fff'}}>Latitude</span>&nbsp;&nbsp;{latitude && latitude}
          <br />
          <span style={{color: '#668fff'}}>Longitude</span>&nbsp;&nbsp;{longitude && longitude}
        </TripCoordinates>
        <TripButtons latitude={latitude} longitude={longitude}></TripButtons>
        </InformationContainer>)
      }
      {/* {currentTrip &&
      (
      )} */}
      {/* <TripContainer >
        {trip1 && friendList.length !== 0 &&
          <NextTrip onClick={() => handleTripOne(trip1)} image={trip1.image || mapboxCap(trip1)}>
            <TripDate>
              {trip1.creator_id !== currentUserID && <FriendAvatar src={avatarFinder(trip1.creator_id, friendList)} />}
              <TripActivity className={trip1.activity}>{trip1.activity}</TripActivity>
              {moment(trip1.start_date).format("MMM DD, YYYY")}
            </TripDate>
            <TripTitle>{trip1.title}</TripTitle>
          </NextTrip>
        }
        <SideTripContainer>
          {trip2 && friendList.length !== 0 &&
            <LaterTrip onClick={() => handleTripTwo(trip2)} image={trip2.image || mapboxCap(trip2)} style={{ marginBottom: "1rem" }}>
              <TripDate>
                {console.log(trip2.creator_id, friendList)}
                {console.log("avatar", avatarFinder(trip2.creator_id, friendList))}
                {trip2.creator_id !== currentUserID && <FriendAvatar src={avatarFinder(trip2.creator_id, friendList)} />}
                <TripActivity className={trip2.activity}>{trip2.activity}</TripActivity>
                {moment(trip2.start_date).format("MMM DD, YYYY")}
              </TripDate>
              <TripTitle>{trip2.title}</TripTitle>
            </LaterTrip>
          }
          {trip3 && friendList.length !== 0 &&
            <LaterTrip onClick={() => handleTripThree(trip3)} image={trip3.image || mapboxCap(trip3)} style={{ marginTop: "1rem" }}>
              <TripDate>
                {trip3.creator_id !== currentUserID && <FriendAvatar src={avatarFinder(trip3.creator_id, friendList)} />}
                <TripActivity className={trip3.activity}>{trip3.activity}</TripActivity>
                {moment(trip3.start_date).format("MMM DD, YYYY")}
              </TripDate>
              <TripTitle>{trip3.title}</TripTitle>
            </LaterTrip>
          }
        </SideTripContainer>
      </TripContainer> */}
    </>
  )
}