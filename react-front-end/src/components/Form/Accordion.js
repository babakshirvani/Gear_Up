import React, { useState, useEffect } from 'react';
import './Accordion.css'

const Accordion = ({ category, gears }) => {
  const [isActive, setIsActive] = useState(false);

  const handler = (e) => {
    console.log("clicked")
  }

  useEffect(() => {
    // console.log(gears)
  }, [])
  return (
    <div className="accordion-item">
      <div className="accordion-title" onClick={() => setIsActive(!isActive)}>
        <div>{category}</div>
        <div>{isActive ? '-' : '+'}</div>
      </div>
      {gears.map((gear) => (isActive && <div key={gear.id} className="accordion-content" onClick={handler}>{gear.name}</div>))}

    </div>
  );
};

export default Accordion;