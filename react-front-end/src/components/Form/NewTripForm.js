import React, { useContext } from 'react';
import LocationForm from '../Map/LocationForm'
import TripInfoForm from './TripInfoForm';
import ActivityForm from './ActivityForm';
import GearList from './GearList';
import { Stepper, StepLabel, Step } from '@material-ui/core';
import { multiStepsContext } from './StepContext';
import Map from '../Map/Map';
// import '../Map/Map.css'
import { flexbox, positions } from '@mui/system';

const NewTripForm = () => {

  const { currentStep } = useContext(multiStepsContext)
  function showStep(step) {
    switch (step) {
      // case 1:
      //   return <TripInfoForm />
      case 1:
        return <LocationForm />
      case 2:
        return <ActivityForm />
      case 3:
        return <GearList />
      default:
        return <TripInfoForm />
    }
  }

  return (
    <div>
      <Stepper activeStep={currentStep - 1} orientation="horizontal">
        <Step>
          <StepLabel></StepLabel>
        </Step>
        <Step>
          <StepLabel></StepLabel>
        </Step>
        <Step>
          <StepLabel></StepLabel>
        </Step>
        {/* <Step>
          <StepLabel></StepLabel>
        </Step> */}
      </Stepper>
      {showStep(currentStep)}
    </div >
  )
}

export default NewTripForm;