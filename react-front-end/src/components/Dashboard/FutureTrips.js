import React, { useState, useEffect } from "react";
import styled from "styled-components";
import bgImage1 from "../assets/trip1.jpg";
import bgImage2 from "../assets/trip2.jpg";
import bgImage3 from "../assets/trip3.jpg";
import moment from "moment";
const date = "2012-12-31";

const TripContainer = styled.div`
  background-color: #F3F5FA;
  width: 50vw;
  height: 48vh;
  left: 15rem;

  position: absolute;  
  box-shadow: 2px 2px 7px 0px rgb(166, 166, 166);
  display: flex;
  flex-direction: row;

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

  &:hover {
    cursor: pointer;
    filter: brightness(115%);
  }
`;

const TripTitle = styled.div`
  margin: 0rem 1.5rem;
  font-size: 3.5rem;
  color: white;
  height: auto;
  text-shadow: 0 0 2px grey, 0 0 2px grey, 0 0 2px grey, 0 0 2px grey;
`;

const TripDate = styled.span`
  display: block;
  margin: 0rem 1.5rem;
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
  font-size: 1rem;
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
  font-size: calc(80%) !important;
  &:hover {
    cursor: pointer;
    filter: brightness(115%);
  }

  & > ${TripTitle} {
    font-size: calc(3.5rem * 0.8);
  }

  & > ${TripDate} {
    font-size: calc(1.8rem * 0.8);
    & > ${TripActivity} {
      font-size: calc(1rem * 0.8);
      margin-right: calc(1.5rem * 0.8)
    }
  }
  `; 

export const FutureTrips = function(props) {

  // const [trip1, setTrip1] = useState({...props.trip1});
  // const [trip2, setTrip2] = useState({...props.trip2});
  // const [trip3, setTrip3] = useState({...props.trip3});
  // const [loaded, setLoaded] = useState(props.loaded);

  // useEffect(() => {
  //   console.log(trip1);
  //   console.log(trip1.image);
  // }, [])


  return (
    <>
      <TripContainer>
        <NextTrip image={bgImage1}>
          <TripDate>
            <TripActivity className="hiking">Hiking</TripActivity>
            {moment(date).format("MMM DD, YYYY")}
          </TripDate>
          <TripTitle>{props.trip1}</TripTitle>
        </NextTrip>
        <SideTripContainer>
          <LaterTrip image={bgImage2} style={{marginBottom: "1rem"}}>
            <TripDate>
              <TripActivity className="backpacking">Backpacking</TripActivity>
              {moment(date).format("MMM DD, YYYY")}
            </TripDate>
            <TripTitle>Test</TripTitle>
          </LaterTrip>
          <LaterTrip image={bgImage3} style={{marginTop: "1rem"}}>
            <TripDate>
              <TripActivity className="camping">camping</TripActivity>
              {moment(date).format("MMM DD, YYYY")}
            </TripDate>
            <TripTitle>Test</TripTitle>
          </LaterTrip>
        </SideTripContainer>
      </TripContainer>
    </>
  )
}
