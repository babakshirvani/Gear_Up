import React, { useState } from 'react';
import NewTripForm from './NewTripForm';

export const multiStepsContext = React.createContext();
const defaultData = {
  "title": null,
  "description": null,
  "start_date": null,
  "end_date": null,
  "activity": [],
  "longitude": 49.234759,
  "latitude": -123.093046
}

const StepContext = () => {
  const [currentStep, setStep] = useState(1);
  const [userData, setUserData] = useState([]);
  const [finalData, setFinalData] = useState([]);
  function submitData() {
    console.log(userData)


  }
  return (
    <div>
      <multiStepsContext.Provider value={{
        currentStep,
        setStep,
        userData,
        setUserData,
        finalData,
        setFinalData,
        submitData
      }} >
        <NewTripForm />
      </multiStepsContext.Provider>
    </div>
  )
}

export default StepContext;
