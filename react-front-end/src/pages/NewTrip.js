import React from 'react'
import NewTripForm from '../components/Form/NewTripForm';
import StepContext from '../components/Form/StepContext';


const NewTrip = () => {
  return (
    <div className="container">
      <StepContext>
        <NewTripForm />
      </StepContext>

    </div>
  )
}
export default NewTrip;
