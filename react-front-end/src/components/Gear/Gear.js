import * as React from 'react';
import {useState} from 'react';
import Activity from './Activity';
import Confirm from './Confirm';
import GearChecklist from './GearChecklist';

export default function Gear() {
  const [state, setState] = useState({step: 1, activity: '',gearChecklist:[], gearChecklistonLoad:[] });

  //Proceed to next step
  const nextstep = () => {
    const { step } = state;
    setState({...state, step: step + 1 })
  }

  const prevstep = () => {
    const { step } = state;
    setState({...state, step: step - 1 })
  }

  const handleChange = (activityname) => {
  //  console.log(Object.values(activityname)[0]);
    setState({...state, activity: Object.values(activityname)[0],gearChecklist:[], gearChecklistonLoad:[]})
  }

  const handleChecklist = (GearChecklist,GearChecklistonLoad) => {
  //  console.log(GearChecklist);
  
    for(let checklist of GearChecklistonLoad) {
      const list = checklist.children.filter((ele) => ele.id !== Object.values(GearChecklist)[0])
      checklist.children = [...list]
    }
    setState({...state,gearChecklist: GearChecklist, gearChecklistonLoad: GearChecklistonLoad})
    //console.log("newlist ",gearChecklistonLoad);
  }
  const { step, activity, gearChecklist,gearChecklistonLoad } = state;
  const values = {activity, gearChecklist, gearChecklistonLoad}
  return (
  
    <div>
    {
    
    (() => {
        switch (step) {
          case 1:
            return <Activity nextstep={nextstep} handleChange={handleChange} values={values}/>
          case 2:
            return <GearChecklist nextstep={nextstep} prevstep={prevstep} handleChecklist={handleChecklist} values={values}/>
          case 3:
            return <Confirm prevstep={prevstep}/>
          // case 'won':
          //   return <Won handleClick={handleClick} />
          // case 'lost':
          //   return <Lost handleClick={handleClick} />
          default:
            return null
        }
      })()}
    </div>
  );

}