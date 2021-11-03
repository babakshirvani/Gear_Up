import React, { useState, useEffect } from "react";
import styled from "styled-components";
import moment from "moment";
import { NavLink } from "react-router-dom";


const TripContainer = styled.div`
  background-color: #F3F5FA;
  width: 100%;
  height: fit-to-content;

  margin: 2rem 0;
  margin-left: 1rem;
  box-shadow: 2px 2px 7px 0px rgb(166, 166, 166);
  display: flex;
  flex-direction: column;

  border-radius: 5px;
`;

const NextTrip = styled(NavLink)`
  border-radius: 12px;
  margin: 1rem 2rem;
  background-image: url(${props => props.image});
  background-size: cover;

  height: 8rem;
  width: auto;
  box-shadow: 1px 2px 8px 2px rgb(166, 166, 166);
  &:hover {
    text-decoration: none;
    cursor: pointer;
    filter: brightness(108%);
  }
  &:first-child {
    margin-top: 2rem;
  }
  &:last-child {
    margin-bottom: 2rem;
  }
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: flex-end;
`;

const TripTitle = styled.span`
  color: white;
  height: auto;
  text-shadow: 0 0 2px grey, 0 0 2px grey, 0 0 2px grey, 0 0 2px grey;
  margin: 0rem 1rem;
  font-size: 1.4rem;
`;

const TopHeadingContainer = styled.div`
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: row;
  align-items: flex-end;
`;

const TripActivity = styled.span`
  vertical-align: text-top;
  color: white;
  text-shadow: none;
  font-size: calc(0.8rem * 0.8);
  border-radius: 19px;
  margin: 0rem 1rem;
  padding: 0.2rem 0.5rem;
  display: inline-block;
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

const FriendAvatar = styled.img`
  height: 60%;
  border: 2px solid skyblue;
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

export const MoreTrips = function(props) {

  const {upcomingTrips} = props;
  const {friendList} = props;
  const currentUserID = Number(localStorage.getItem('user_id'));

  return (
    <>
      <TripContainer>
        {upcomingTrips !==0 && friendList.length !== 0 && upcomingTrips.slice(3).map(trip => {
        return (<NextTrip to={`/calendar/${trip.id}`} image={trip.image || mapboxCap(trip)}>
            <TopHeadingContainer>
            {trip.creator_id !== currentUserID && <FriendAvatar src={avatarFinder(trip.creator_id, friendList)} />}
            <TripActivity className={trip.activity}>{trip.activity}</TripActivity>
            </TopHeadingContainer>
          <TripTitle>{trip.title}</TripTitle>
        </NextTrip>)
        })}
      </TripContainer>
    </>
  )
}
