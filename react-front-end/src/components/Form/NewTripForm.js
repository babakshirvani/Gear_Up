import React, { Component, useContext } from 'react';
import TripInfoForm from './TripInfoForm';
import ActivityForm from './ActivityForm';
import GearList from './GearList';
import { Stepper, StepLabel, Step } from '@material-ui/core';
import { multiStepsContext } from './StepContext';

const NewTripForm = () => {

  const { currentStep, finalData } = useContext(multiStepsContext)
  function showStep(step) {
    switch (step) {
      case 1:
        return <TripInfoForm />
      case 2:
        return <ActivityForm />
      case 3:
        return <GearList />
    }
  }

  return (
    <div style={{ paddingLeft: '12rem', paddingTop: '6rem' }}>
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
      </Stepper>
      {showStep(currentStep)}

    </div>
  )
}

export default NewTripForm;