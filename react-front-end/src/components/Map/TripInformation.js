import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const InformationContainer = styled.div`
  background-color: #F3F5FA;
  position: absolute;
  width: 13vw;
  height: 58vh;
  top: 14vh;
  right: 7vw;
  z-index: 1;
  box-shadow: 2px 2px 7px 0px rgb(166, 166, 166);
  display: flex;
  flex-direction: column;

  border-radius: 5px;
`;

export default function TripInformation(props) {

  return (
    <>
      <InformationContainer>


      </InformationContainer>
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