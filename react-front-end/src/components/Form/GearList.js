
import React, { useContext } from 'react'
import { Button, TextField } from '@material-ui/core';
import { multiStepsContext } from './StepContext';


export default function GearList() {
  const { setStep, userData, setUserData, submitData } = useContext(multiStepsContext)

  return (
    <>
      <h4 style={{ color: 'white' }}>Your Gear List!</h4>
      <br />

      <div>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => setStep(2)}
        >
          Back
        </Button><span> </span>
        <Button
          variant="contained"
          color="primary"
          onClick={submitData}
        >
          Save
        </Button>

      </div>
    </>
  )
}
