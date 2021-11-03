import React, { useState, useEffect } from "react";
import styled from "styled-components";
import bgImage1 from "../assets/trip1.jpg";
import bgImage2 from "../assets/trip2.jpg";
import bgImage3 from "../assets/trip3.jpg";
import moment from "moment";


const TripContainer = styled.div`
  background-color: #F3F5FA;
  width: 100%;
  height: 48vh;
  left: 0;
  right: 0;
  margin-left: auto;
  margin-right: auto;
    
  box-shadow: 2px 2px 7px 0px rgb(166, 166, 166);
  display: flex;
  flex-direction: row;

  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
`;

const NextTrip = styled.div`
  border-radius: 19px;
  margin: 2rem;
  margin-right: 1rem;
  background-image: url(${props => props.image});
  background-size: cover;

  width: 50%;
  box-shadow: 1px 2px 8px 2px rgb(166, 166, 166);
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-end;
  text-align: right;
  &:hover {
    cursor: pointer;
    filter: brightness(108%);
  }
`;

const TripTitle = styled.div`
  margin: 0rem 1.5rem;
  font-size: 2.6rem;
  color: white;
  height: auto;
  text-shadow: 0 0 2px grey, 0 0 2px grey, 0 0 2px grey, 0 0 2px grey;
`;

const TripDate = styled.span`
  display: block;
  margin: 0rem 1.2rem;
  font-size: 1.8rem;
  color: white;
  text-shadow: 0 0 2px grey, 0 0 2px grey, 0 0 2px grey, 0 0 2px grey;
`;

const TripActivity = styled.span`
  vertical-align: middle;
  display: inline-block;
  margin: 0rem 1.5rem;
  padding: 0.3rem 0.6rem;
  border-radius: 9px;
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

const SideTripContainer = styled.div`
  border-radius: 19px;
  margin: 2rem;
  margin-left 1rem;
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-end;
`;

const LaterTrip = styled.div`
  border-radius: 19px;
  background-image: url(${props => props.image});
  background-size: cover;

  height: 50%;
  width: 100%;
  box-shadow: 1px 2px 8px 2px rgb(166, 166, 166);
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-end;
  font-size: 1.4rem !important;
  text-align: right;
  &:hover {
    cursor: pointer;
    filter: brightness(115%);
  }

  & > ${TripTitle} {
    font-size: calc(2.6rem * 0.8);
  }

  & > ${TripDate} {
    font-size: calc(1.8rem * 0.8);
    & > ${TripActivity} {
      font-size: calc(0.8rem * 0.8);
      margin-right: calc(0.7rem * 0.8)
    }
  }
  `; 

const FriendAvatar = styled.img`
  height: 80%;
  border: 3px solid skyblue;
  border-radius: 45px;
  display: inline-block;
  src: ${props => props.avatar};
`;

const mapboxCap = function(trip) {
  return `https://api.mapbox.com/styles/v1/mapbox/outdoors-v11/static/${trip.longitude},${trip.latitude},14,0/600x600?access_token=${process.env.REACT_APP_MAPBOX_API_KEY}`;
}

const avatarFinder = function(friendID, list) {
  for (const friend of list) {
    if (friend.id === friendID) return friend.avatar;
  }
}

export const FutureTrips = function(props) {

  const [trip1, trip2, trip3] = props.upcomingTrips;
  const {friendList} = props;
  const currentUserID = Number(localStorage.getItem('user_id'));


  return (
    <>
      <TripContainer>
        {trip1 && friendList.length !== 0 &&
        <NextTrip image={trip1.image || mapboxCap(trip1)}>
          <TripDate>
            {trip1.creator_id !== currentUserID && <FriendAvatar src={avatarFinder(trip1.creator_id, friendList)} />}
            <TripActivity className={trip1.activity}>{trip1.activity}</TripActivity>
            {moment(trip1.start_date).format("MMM DD, YYYY")}
          </TripDate>
          <TripTitle>{trip1.title}</TripTitle>
        </NextTrip>        
        }
        <SideTripContainer>
          {trip2 && friendList.length !== 0  &&
            <LaterTrip image={trip2.image || mapboxCap(trip2)} style={{marginBottom: "1rem"}}>
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
          {trip3 && friendList.length !== 0  &&
            <LaterTrip image={trip3.image || mapboxCap(trip3)} style={{marginTop: "1rem"}}>
              <TripDate>
              {trip3.creator_id !== currentUserID && <FriendAvatar src={avatarFinder(trip3.creator_id, friendList)} />}
              <TripActivity className={trip3.activity}>{trip3.activity}</TripActivity>
              {moment(trip3.start_date).format("MMM DD, YYYY")}
              </TripDate>
              <TripTitle>{trip3.title}</TripTitle>
            </LaterTrip>
          }
        </SideTripContainer>
      </TripContainer>
    </>
  )
}
