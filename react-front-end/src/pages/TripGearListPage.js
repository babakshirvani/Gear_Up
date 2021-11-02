
import React from 'react'
import TripGearList from '../components/GearList/TripGearList';

const TripGearListPage = () => {
  return (
    <>
      <div style={{
        zIndex: '1',
        position: 'absolute',
        top: '15vh',
        left: '0',
        right: '0',
        marginLeft: 'auto',
        marginRight: 'auto',
        width: '40vw',
      }}>
        <TripGearList />
      </div>

    </>
  )
}
export default TripGearListPage;
