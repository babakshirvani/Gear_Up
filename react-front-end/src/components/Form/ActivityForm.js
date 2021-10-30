import React, { useEffect, useContext } from 'react'
import { Button, FormControl, FormControlLabel, FormLabel, RadioGroup, Radio } from '@material-ui/core';
import { multiStepsContext } from './StepContext';
// import axios from 'axios';



export default function ActivityForm() {
  const { setStep, userData, setUserData } = useContext(multiStepsContext)
  const handleChange = (event) => {
    // event.preventDefault();
    console.log("thisIsThe ACtiviti:::", event.target.value)
    setUserData({ ...userData, "activity": event.target.value });
  };

  const saveTrip = () => {
    setStep(3)
  }

  return (
    <>
      <h4 style={{ color: 'white' }}>Tell us about your trip!</h4>
      <h6 style={{ color: 'white' }}>Select the categories below that apply to this trip so we can make a custom packing list for you from all the gear in your gear closet.</h6>
      <br />
      <div style={{ overflow: 'auto' }}>
        <FormControl component="fieldset">
          <FormLabel component="legend">Activity</FormLabel>
          <RadioGroup
            aria-label="activity"
            // defaultValue="Backpacking"
            name="customized-radios"
            value={userData.activity || ""}
            onChange={handleChange}
          >
            <FormControlLabel value="Day Hiking" control={<Radio />} label="Day Hiking" />
            <img style={{ maxWidth: 650, maxHeight: 162, borderRadius: "30px", boxShadow: "3px 9px 9px #9E9E9E", marginBottom: "30px" }} src="https://res.cloudinary.com/getpackup/image/upload/c_fill,g_north,h_512,w_2048/v1626723073/getpackup/0F1A2340_zy0asj.jpg" alt="Day Hiking" />
            <FormControlLabel value="Backpacking" control={<Radio />} label="Backpacking" />
            <img style={{ maxWidth: 650, maxHeight: 162, borderRadius: "30px", boxShadow: "3px 9px 9px #9E9E9E", marginBottom: "30px" }} src="https://res.cloudinary.com/getpackup/image/upload/c_fill,h_512,w_2048/v1626131669/getpackup/GrosMorneNFLD_TaylorBurk-2_oio34q.jpg" alt="Backpacking" />
            <FormControlLabel value="Car Camping" control={<Radio />} label="Car Camping" />
            <img style={{ maxWidth: 650, maxHeight: 162, borderRadius: "30px", boxShadow: "3px 9px 9px #9E9E9E", marginBottom: "30px" }} src="https://purewows3.imgix.net/images/articles/2020_06/car_camping_checklist_400.png?auto=format,compress&cs=strip" alt="Car Camping" />
          </RadioGroup>
        </FormControl>

        <div style={{ padding: "2rem" }}>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => setStep(1)}
          >
            Back
          </Button> <span> </span>
          <Button
            variant="contained"
            color="primary"
            onClick={saveTrip}
          >
            Generate
          </Button>
        </div>
      </div>
    </>
  )
}
