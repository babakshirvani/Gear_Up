import React, { useState, useEffect } from 'react';
import './Accordion.css'
import axios from 'axios';


const Accordion = ({ category, gears, tripID }) => {
  const [isActive, setIsActive] = useState(false);
  const [isComplete, setComplete] = useState("");

  const handler = (gear) => {
    if (!gear.checked && gear.id) {
      gear.checked = true
      setComplete(makeid(5))
      axios.put(`/api/userGear/update/${tripID}`,
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
      axios.put(`/api/userGear/update/${tripID}`,
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

  useEffect(() => {
    console.log("clicked!!!!!!!!!  state", isComplete)
  }, [isComplete])
  return (
    <>
      <div className="accordion-item">
        <div className="accordion-title" onClick={() => setIsActive(!isActive)}>
          <div>{category}</div>
          <div>{isActive ? '-' : '+'}</div>
        </div>
        {gears.map((gear) => (
          isActive &&
          <div style={{
            textDecoration: gear.checked && 'line-through'
          }} className="accordion-content" key={gear.id} onClick={() => handler(gear)}>
            {gear.name}
          </div>
        ))}

      </div>

    </>
  );
};

export default Accordion;