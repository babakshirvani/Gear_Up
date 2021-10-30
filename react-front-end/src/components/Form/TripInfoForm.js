import React, { useState, useContext, useEffect } from 'react'
import { Button, TextField } from '@material-ui/core';
import { multiStepsContext } from './StepContext';
import Box from '@mui/material/Box';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateRangePicker from '@mui/lab/DateRangePicker';


const TripInfoForm = () => {
  const [value, setValue] = useState([null, null]);
  const { setStep, userData, setUserData } = useContext(multiStepsContext)
  // useEffect(() => {
  //   // console.log("useeffect::", userData)

  // }, [userData.end_date])

  return (
    <>
      <h4 style={{ color: 'white' }}>Create New Trip</h4>
      <div >
        <TextField
          id="standard-basic"
          label="Title"
          value={userData['title']}
          onChange={(e) => setUserData({ ...userData, "title": e.target.value })}
          margin="normal"
          variant="standard"
          color="secondary"
          fullWidth
        />
      </div>

      <div>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DateRangePicker
            disablePast
            calendars={2}
            startText="Start date"
            endText="End date"
            value={value}
            onChange={(e) => {
              if (e[1]) {
                setUserData({ ...userData, "start_date": e[0], "end_date": e[1], "date": e })
                setValue(e)
              }
            }}
            renderInput={(startProps, endProps) => (
              <React.Fragment>
                <TextField {...startProps} />
                <Box sx={{ mx: 3 }}> to </Box>
                <TextField {...endProps} />
              </React.Fragment>
            )}
          />
        </LocalizationProvider>

      </div>

      <div>
        <TextField
          label="Description"
          value={userData['description']}
          onChange={(e) => setUserData({ ...userData, "description": e.target.value })}
          fullWidth
          id="fullWidth"
          margin="normal"
          variant="outlined"
          color="secondary"
          multiline
          rows={4}
        // id="standard-multiline-static"
        />
      </div>
      <div>
        <Button
          variant="contained"
          color="primary"
          onClick={() => setStep(2)}
        >
          Next
        </Button>
      </div>
    </>

  )
}

export default TripInfoForm;
// multiline