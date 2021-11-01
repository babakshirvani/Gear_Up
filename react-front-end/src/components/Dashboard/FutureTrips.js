import React from "react";
import styled from "styled-components";

const TripContainer = styled.div`
  background-color: #F3F5FA;
  width: 14rem;
  height: 14rem;
  left: 30vw;
  top: 10vh;
  position: absolute;  
  box-shadow: 2px 2px 7px 0px rgb(166, 166, 166);
`;

export const FutureTrips = function() {
  return (
    <>
      <TripContainer>
        <div className="dashboard-trip-major">

        </div>
      </TripContainer>
    </>
  )
}
