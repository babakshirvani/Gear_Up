import React from 'react';
import {ListBox, Item, Section, Provider, defaultTheme, Button} from '@adobe/react-spectrum'



export default function Activity(props) {
  console.log(props.values)

const next = (e) => {
  e.preventDefault();
  props.nextstep();
}
//console.log(props)
  const {values} = props;
  let options = [
    {id: 1, name: 'Backpacking'},
    {id: 2, name: 'Car Camping'},
    {id: 3, name: 'Day Hiking'}
  ];
  return (
    <div className="container">
    <Provider theme={defaultTheme}>

    <ListBox
            width="size-2400"
            aria-label="Select activity"
            items={options}
            selectedKeys={[props.values.activity]}
            selectionMode="single"
            onSelectionChange={(selected) => props.handleChange(selected)}>
              {(item) => <Item key={item.name}>{item.name}</Item>}
          </ListBox>
          <Button onClick={next}>NEXT</Button>
    </Provider>
    </div>
  );
}