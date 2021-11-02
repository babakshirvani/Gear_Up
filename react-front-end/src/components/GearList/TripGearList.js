import React, { useState, useEffect } from 'react';
import './TripGearList.css'
import axios from 'axios';
import { Link } from 'react-router-dom';


const TripGearList = () => {
  const [isActive, setIsActive] = useState(false);
  const [isComplete, setComplete] = useState("");
  const [upcomingTrips, setUpcomingTrips] = useState([]);
  const [gearList, setGearList] = useState([]);


  // useEffect(() => {
  //   const user_id = localStorage.getItem('user_id');
  //   axios.get(`api/trips/dashboard/${user_id}`)
  //     .then((res) => {
  //       setUpcomingTrips([...res.data]);
  //     })
  // }, [])


  useEffect(() => {

    // const user_id = localStorage.getItem('user_id');
    axios.get(`/api/userGearList/19`)
      .then((res) => {
        console.log(res.data)

        function createGearObject() {
          const categories = [];
          for (let item of res.data) {
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
            for (let gear of res.data) {
              if (category === gear.category) {
                gearId.push(gear.id);
                userGearList["gears"].push({ "id": gear.id, "name": gear.type, checked: gear.checked });
              }
            }
            gearList.push(userGearList);
          }
          // setGearIdList(gearId);
          // setGear(gearList);
          console.log("87:", gearList)
          // console.log("86:",gearList)
          setGearList(gearList);
          return gearId;
        }
        createGearObject()
      })


  }, [])


  const handler = (gear) => {
    if (!gear.checked && gear.id) {
      gear.checked = true
      setComplete(makeid(5))
      axios.put(`/api/userGear/update/19`,
        {
          "type_id": gear.id,
          "checked": true
        }
      ).then(res => {
        console.log("res TRUE", res)
      })
    }
    else {
      gear.checked = false
      setComplete(makeid(5))
      axios.put(`/api/userGear/update/19`,
        {
          "type_id": gear.id,
          "checked": false
        }
      ).then(res => {
        console.log("res false", res)
      })
      // console.log("clicked!!!!!!!!! FALSE state", isComplete)
    }

  }

  function makeid(length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() *
        charactersLength));
    }
    return result;
  }



  return (
    <>
      <div className="accordion-item" style={{ margin: '20rem' }}>
        {gearList.map((item, index) => (

          <div key={index}>
            <div className="accordion-title" onClick={() => setIsActive(!isActive)}>
              <div>{item.category}</div>
              <div>{isActive ? '-' : '+'}</div>
            </div>
            {item.gears.map((gear) => (
              isActive &&
              <div style={{
                textDecoration: gear.checked && 'line-through'
              }} className="accordion-content" key={gear.id} onClick={() => handler(gear)}>
                {gear.name}
              </div>
            ))}

          </div>

        ))}
      </div>

    </>
  );
};

export default TripGearList;