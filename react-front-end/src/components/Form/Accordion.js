import React, { useState, useEffect } from 'react';
import './Accordion.css'

const Accordion = ({ title, content }) => {
  const [isActive, setIsActive] = useState(false);
  const [status, setStatus] = useState("uncheck")

  const handler = (e) => {
    setStatus
  }

  useEffect(() => {
    console.log(content)
  }, [])
  return (
    <div className="accordion-item">
      <div className="accordion-title" onClick={() => setIsActive(!isActive)}>
        <div >{title}</div>
        <div>{isActive ? '-' : '+'}</div>
      </div>
      {content.map((x) => (
        isActive &&
        <div className={"accordion-content" + { x.name.complete ? "strike" : "" }}
          onClick={handler}>{x.name}</div>
      ))}

    </div>
  );
};

export default Accordion;