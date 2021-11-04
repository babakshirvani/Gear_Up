import React, { useContext } from 'react'
import { Button, TextField, FormControl, FormControlLabel, FormLabel, RadioGroup, Radio } from '@material-ui/core';
import { multiStepsContext } from './StepContext';



export default function ActivityForm() {
  const { setStep, userData, setUserData } = useContext(multiStepsContext)
  const handleChange = (event) => {
    setUserData({ ...userData, "activity": event.target.value });
  };

  const handleNext = () => {
    if (userData.activity) {
      setStep(4)
      console.log("Selected Activity:", userData.activity)
      console.log("User Data in by the end of Activity Form:", userData)
    }
  }


  return (
    <>
      <div style={{
        zIndex: '1',
        position: 'absolute',
        top: '14vh',
        left: '0',
        right: '0',
        marginLeft: 'auto',
        marginRight: 'auto',
        width: '40vw',
      }}>
        {/* <h4 style={{ color: 'white' }}>Tell us about your trip!</h4>
        <h6 style={{ color: 'white' }}>Select the categories below that apply to this trip so we can make a custom packing list for you from all the gear in your gear closet.</h6>
        <br /> */}
        <div style={{ overflow: 'auto',  display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <FormControl component="fieldset">
            <FormLabel component="legend" style={{ margin: '2rem', marginLeft: '0' }}>Choose an activity</FormLabel>
            <RadioGroup
              aria-label="activity"
              // defaultValue="Backpacking"
              name="customized-radios"
              value={userData.activity || ""}
              onChange={handleChange}
            >
              <FormControlLabel value="hiking" control={<Radio />} label="Day Hiking" />
              <img style={{ width: '30vw', height: '14vh', borderRadius: "20px", boxShadow: "3px 9px 9px #9E9E9E", marginBottom: "4rem", objectFit: "cover" }} src="/images/form-dayhiking.jpg" alt="Day Hiking" />
              <FormControlLabel value="backpacking" control={<Radio />} label="Backpacking" />
              <img style={{ width: '30vw', height: '14vh', borderRadius: "20px", boxShadow: "3px 9px 9px #9E9E9E", marginBottom: "4rem", objectFit: "cover" }} src="/images/form-backpacking.jpg" alt="Backpacking" />
              <FormControlLabel value="camping" control={<Radio />} label="Car Camping" />
              <img style={{ width: '30vw', height: '14vh', borderRadius: "20px", boxShadow: "3px 9px 9px #9E9E9E", marginBottom: "4rem", objectFit: "cover" }} src="/images/form-carcamping.jpg" alt="Car Camping" />
            </RadioGroup>
          </FormControl>

          <TextField id="standard-basic"
            label="Add Custom Image URL"
            value={userData['image'] || ""}
            onChange={(e) => setUserData({ ...userData, "image": e.target.value })}
            margin="normal"
            variant="standard"
            color="secondary"
            fullWidth
          />

          <div style={{ padding: "2rem", display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => setStep(2)}
              style={{marginRight: '1rem'}}
            >
              Back
            </Button> <span> </span>
            <Button
              variant="contained"
              color="primary"
              onClick={handleNext}
              style={{marginLeft: '1rem'}}
            >
              Generate
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}
