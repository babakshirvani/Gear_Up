
import React, { useState, useEffect, useContext } from 'react'
import { Button } from '@material-ui/core';
import { multiStepsContext } from './StepContext';
import axios from 'axios';
import Accordion from './Accordion';
// import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';


import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import CommentIcon from '@mui/icons-material/Comment';
import IconButton from '@mui/material/IconButton';
import { set } from 'date-fns';




export default function GearList() {


  const [expanded, setExpanded] = React.useState(false);
  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const { setStep, userData, setUserData, submitData } = useContext(multiStepsContext)
  const [gear, setGear] = useState([])

  useEffect(() => {
    const activity = userData.activity;
    Promise.all([
      axios.get(`/api/activities/${activity}`)
    ])
      .then((all) => {


        console.log("2 ", all[0].data)

        function haha() {
          const categories = [];
          for (let item of all[0].data) {
            if (!categories.includes(item.category)) {
              categories.push(item.category)
            }
          }
          const gearList = []
          for (let category of categories) {
            const userGearList = {}
            userGearList["category"] = category;
            userGearList["gears"] = [];
            for (let gear of all[0].data) {
              if (category === gear.category) {
                userGearList["gears"].push({ "id": gear.id, "name": gear.type });
              }
            }
            gearList.push(userGearList);
          }
          console.log("GEARLIST::", gearList)
          setGear(gearList)
          return gearList;
        }
        haha()
        // console.log(all[0].data)
      })
    // .then((newList) => {
    //   console.log("NEWLIST?", newList)
    //   setGear(newList);
    // })
  }, []);




  return (
    <>
      <h4 style={{ color: 'white' }}>Your Gear List!</h4>
      <br />
      <div>



        <div className="accordion">
          {console.log("BEFORE MAP::", gear)}
          {gear.map((item, index) => (
            <>
              <Accordion key={index} title={item.category} content={item.gears} />
            </>
          ))}
        </div>


        <div style={{
          padding: "2rem"
        }} >
          {/* <Button
            variant="contained"
            color="secondary"
            onClick={() => setStep(2)}
          >
            Back
          </Button><span> </span> */}
          < Button
            variant="contained"
            color="primary"
            onClick={submitData}
          >
            Save
          </Button>
        </div>
      </div >
    </>
  )
}
