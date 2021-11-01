
import React, { useState, useEffect, useContext } from 'react'
import { Button } from '@material-ui/core';
import { multiStepsContext } from './StepContext';
import axios from 'axios';
import Accordion from './Accordion';
import { useHistory } from 'react-router-dom';


export default function GearList() {
  const { userData } = useContext(multiStepsContext)
  const [gear, setGear] = useState([])
  const [gearIdList, setGearIdList] = useState([null])
  let history = useHistory();

  const redirect = () => {
    history.push('/calendar')
  }

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
                userGearList["gears"].push({ "id": gear.id, "name": gear.type });
              }
            }
            gearList.push(userGearList);
          }
          setGearIdList(gearId);
          setGear(gearList);
          return gearId;
        }
        console.log("sofar userData::", userData)
        console.log("so far gear IDSS:: ", createGearObject())
        return createGearObject()
      }).then((res) => {
        axios.post(`/api/newTrip`,
          userData
        ).then((resPost) => {
          console.log("this is after createing new trip:", resPost.data)
          console.log("this is all gear ids:", gearIdList)

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
        <h4 style={{ color: 'white' }}>Your Gear List!</h4>
        <br />
        <div>
          <div className="accordion">
            {/* {console.log("BEFORE MAP::", gear)} */}
            {gear.map((item) => (
              <>
                <Accordion key={item.id} category={item.category} gears={item.gears} />
              </>
            ))}
          </div>

          <div style={{
            padding: "2rem"
          }} >
            < Button
              variant="contained"
              color="primary"
              onClick={redirect}
            >
              Save
            </Button>
          </div>
        </div >
      </div>
    </>
  )
}
