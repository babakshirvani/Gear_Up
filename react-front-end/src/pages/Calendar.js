
import React from 'react'
import { useParams } from 'react-router';
import Trips from '../components/Map/Trips';

const Calendar = () => {

  const { id } = useParams();

  return (
    <>
      <Trips tripID={id}></Trips>
    </>
  )
}
export default Calendar;
