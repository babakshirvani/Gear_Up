import React from 'react'
import NewTripForm from '../components/Form/NewTripForm';
import StepContext from '../components/Form/StepContext';


const NewTrip = () => {
  return (
    <>
      <StepContext>
        <NewTripForm />
      </StepContext>

    </>
  )
}
export default NewTrip;
