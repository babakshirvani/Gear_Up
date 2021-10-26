import React, { useState } from 'react';
//import {ListBox, Item, Section, Provider, defaultTheme, Button} from '@adobe/react-spectrum';
import {
  Provider,
  defaultTheme,
  Button,
  Flex,
  ListBox,
  Item,
  Text,
  Section
} from "@adobe/react-spectrum";
import {useEffect} from 'react';
import axios from 'axios';


export default function GearChecklist(props) {

//let [checklistonload, setChecklistonload] = useState([]);
const [checklistonload, setChecklistonload] = useState([]);
const next = (e) => {
  e.preventDefault();
  props.nextstep();
}

const prev = (e) => {
  e.preventDefault();
  props.prevstep();
}

useEffect(() => {
  const activity = props.values.activity;

  Promise.all([    
    axios.get(`/api/activity/${activity}`)
  ])
  .then((all) => {
    //setState((prev) => ({ ...prev, days: all[0].data, appointments: all[1].data, interviewers:all[2].data }));
    
    setChecklistonload(all[0].data);
    console.log("2 ",checklistonload)
  
  //  props.values.gearChecklistonLoad = [...all[0].data]
    //props.handleChecklist(all[0].data)
  });

}, []);
//
useEffect(() => {

    

  if(props.values.gearChecklistonLoad.length !== 0) {
    // const keyList = checklistonload.items.map(item => item.id)
    // keyList.forEach( key => checklistonload.remove(key) )
  
    //console.log(props.values.gearChecklistonLoad)
    //setChecklistonload([]);
    setChecklistonload(props.values.gearChecklistonLoad);
    //console.log("1 ",checklistonload)
  }
});


//console.log("1 ",checklistonload)
//console.log(props)
  // const {values} = props;
  // let options = [
  //   {id: 1, name: 'Backpacking'},
  //   {id: 2, name: 'Car Camping'},
  //   {id: 3, name: 'Day Hiking'}
  // ];
  return (
    
  <Provider theme={defaultTheme}>
    {/* {props.values.gearChecklist}
    {JSON.stringify(props.values.gearChecklistonLoad)}<br/>
  {JSON.stringify(checklistonload)} */}
  <Flex direction="column">
    <ListBox
        aria-label="Pick an animal"
        items={checklistonload}
      
        selectedKeys={props.values.gearChecklist}
        selectionMode="multiple"
        onSelectionChange={(selected) => props.handleChecklist(selected,checklistonload)}
        width="size-2400">
        {(item) => (
          <Section key={item.name} items={item.children} title={item.name}>
            {(item) => <Item key={item.id} textValue={item.name}>{item.name}</Item>}
          </Section>
        )}
       
    </ListBox>
    </Flex>

  {/* <ListBox
          width="size-2400"
          aria-label="Select activity"
          items={props.values.gearChecklist}
          selectionMode="single"
          onSelectionChange={(selected) => props.handleChange(selected)}>
            {(item) => <Item key={item.type}>{item.type}</Item>}
        </ListBox> */}
    <Button onClick={next}>NEXT</Button>
    <Button onClick={prev}>PREV</Button>
  </Provider>
  
  );
}