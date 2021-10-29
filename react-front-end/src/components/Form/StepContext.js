import React, { useState } from 'react';
import NewTripForm from './NewTripForm';

export const multiStepsContext = React.createContext();
const StepContext = () => {
  const [currentStep, setStep] = useState(1);
  const [userData, setUserData] = useState([{"start_date": "Start Date", "end_date": "End Date", date: [null, {}], activity: []}]);
  const [finalData, setFinalData] = useState([]);
  function submitData() {

  }
  return (
    <div>
      <multiStepsContext.Provider value={{ currentStep, setStep, userData, setUserData, finalData, setFinalData, submitData }} >
        <NewTripForm />
      </multiStepsContext.Provider>
    </div>
  )
}

export default StepContext;
