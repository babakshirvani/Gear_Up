import React from 'react';
import {Button} from '@adobe/react-spectrum'

export default function Confirm(props) {
  const prev = (e) => {
    e.preventDefault();
    props.prevstep();
  }
  
  return (
    
    <div className="container">
      Thank you!!
      <Button>CONFIRM</Button>
      <Button onClick={prev}>GoBack</Button>
    </div>
  );
}