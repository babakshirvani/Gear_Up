import React, { useContext } from 'react';
import TripInfoForm from './TripInfoForm';
import ActivityForm from './ActivityForm';
import GearList from './GearList';
import { Stepper, StepLabel, Step } from '@material-ui/core';
import { multiStepsContext } from './StepContext';
import Map from '../Map/Map';

const NewTripForm = () => {

  const { currentStep } = useContext(multiStepsContext)
  function showStep(step) {
    switch (step) {
      case 1:
        return <Map />
      case 2:
        return <TripInfoForm />
      case 3:
        return <ActivityForm />
      case 4:
        return <GearList />
      default:
        return <Map />
    }
  }

  return (
    <div style={{ paddingLeft: '12rem', paddingTop: '2rem' }}>
      <Stepper style={{ width: '100%', background: 'none' }} activeStep={currentStep - 1} orientation="horizontal">
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

    </div>
  )
}

export default NewTripForm;