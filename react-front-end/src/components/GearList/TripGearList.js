import React, { useState, useEffect } from 'react';
import './TripGearList.css'
import axios from 'axios';
import { Link, useLocation } from 'react-router-dom';


const TripGearList = () => {
  const [isActive, setIsActive] = useState(false);
  const [isComplete, setComplete] = useState("");
  const [trip, setTrip] = useState(0);
  const [gearList, setGearList] = useState([]);
  const history = useLocation();


  useEffect(() => {
    console.log("history44", history)
    axios.get(history.pathname)
      .then((res) => {
        setTrip(res.data[0].trip_id)

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
      axios.put(`/api/userGear/update/${trip}`,
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
      axios.put(`/api/userGear/update/${trip}`,
        {
          "type_id": gear.id,
          "checked": false
        }
      ).then(res => {
      })
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
      <div className="accordion-item" >
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