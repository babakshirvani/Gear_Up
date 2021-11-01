import React, { useContext } from 'react';
import LocationForm from '../Map/LocationForm'
import TripInfoForm from './TripInfoForm';
import ActivityForm from './ActivityForm';
import GearList from './GearList';
import { Stepper, StepLabel, Step } from '@material-ui/core';
import { multiStepsContext } from './StepContext';

const NewTripForm = () => {

  const { currentStep } = useContext(multiStepsContext)
  function showStep(step) {
    switch (step) {
      // case 1:
      //   return <TripInfoForm />
      case 1:
        return <LocationForm />
      case 2:
        return <TripInfoForm />
      case 3:
        return <ActivityForm />
      case 4:
        return <GearList />
      default:
        return <LocationForm />
    }
  }

  return (
    < >
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
        <Step>
          <StepLabel></StepLabel>
        </Step>
      </Stepper>
      {showStep(currentStep)}
    </ >
  )
}

export default NewTripForm;