
import React from 'react'
import TripGearList from '../components/GearList/TripGearList';
import { useParams } from 'react-router';

const TripGearListPage = props => {
  
  const { id } = useParams();
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
        <TripGearList tripID={id} />
      </div>

    </>
  )
}
export default TripGearListPage;
