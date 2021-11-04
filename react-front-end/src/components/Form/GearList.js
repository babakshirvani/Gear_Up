
import React, { useState, useEffect, useContext } from 'react'
import { Button } from '@material-ui/core';
import { multiStepsContext } from './StepContext';
import axios from 'axios';
import Accordion from './Accordion';
import { Link } from 'react-router-dom';
import { set } from 'date-fns';



export default function GearList() {
  const { userData, setUserData } = useContext(multiStepsContext)
  const [gear, setGear] = useState([])
  const [gearIdList, setGearIdList] = useState([null])


  useEffect(() => {
    const activity = userData.activity;
    Promise.all([
      axios.get(`/api/activities/${activity}`)
    ])
      .then((all) => {
        function createGearObject() {
          const categories = [];
          for (let item of all[0].data) {
            if (!categories.includes(item.category)) {
              categories.push(item.category)
            }
          }
          const gearId = [];
          const gearList = [];
          for (let category of categories) {
            const userGearList = {}
            userGearList["id"] = categories.indexOf(category);
            userGearList["category"] = category;
            userGearList["gears"] = [];
            for (let gear of all[0].data) {
              if (category === gear.category) {
                gearId.push(gear.id);
                userGearList["gears"].push({ "id": gear.id, "name": gear.type, checked: gear.checked });
              }
            }
            gearList.push(userGearList);
          }
          setGearIdList(gearId);
          setGear(gearList);
          console.log("86:", gearList)
          // console.log("86:",gearList)
          return gearId;
        }
        // console.log("sofar userData::", userData)
        // console.log("so far gear IDSS:: ", createGearObject())
        return createGearObject()
      }).then((res) => {
        axios.post(`/api/newTrip`,
          userData
        ).then((resPost) => {
          setUserData({ ...userData, tripID: resPost.data.id })
          res.map((id) => (
            axios.post('/api/newGearList',
              {
                "trip_id": resPost.data.id,
                "type_id": id,
                "checked": false
              }
            )))
        })
      })
    console.log("this is all gear ids::::?????2222:", gearIdList)
    // eslint-disable-next-line
  }, [userData.activity]);

  const ref = React.createRef();

  return (
    <>
      <div style={{
        zIndex: '1',
        position: 'absolute',
        top: '15vh',
        left: '0',
        right: '0',
        marginLeft: 'auto',
        marginRight: 'auto',
        width: '40vw',
      }}>
        <h4 style={{ color: 'white' }}>Your Gear List!</h4>
        <br />
        <div>
          <div className="accordion" ref={ref} >
            {console.log("BEFORE MAP::", gear)}
            {gear.map((item, i) => (
              <>
                <Accordion key={item.id} category={item.category} gears={item.gears} tripID={userData.tripID} />
              </>
            ))}
          </div>

          <div style={{
            padding: "2rem", display: 'flex', flexDirection: 'row', justifyContent: 'center'
          }} >
            < Button
              variant="contained"
              color="primary"
              component={Link} to="/dashboard"
            >
              Dashboard
            </Button>
            
          </div>
        </div >
      </div>
    </>
  )
}
