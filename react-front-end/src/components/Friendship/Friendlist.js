import * as React from 'react';
import  {useState, useEffect} from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import axios from "axios";



function generate(element) {
  return [0, 1, 2].map((value) =>
    React.cloneElement(element, {
      key: value,
    }),
  );
}

const Demo = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
}));




export default function InteractiveList() {
  const [dense, setDense] = React.useState(false);
  const [secondary, setSecondary] = React.useState(false);
  const [friendlist, setFriendlist] = useState([]);

  useEffect(()=>{
    const user_id=localStorage.getItem('user_id')
    axios.get(`api/friendlist/${user_id}`)
    .then((res)=>{
      setFriendlist([...res.data]);
    })
  },[])

  // console.log(friendlist);
  return (
    <List dense sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper', borderRadius: '10px' }}>
      <h6 style={{padding: '1rem 1.65rem', fontSize: '1.4rem', borderBottom: '1px lightgrey solid', marginBottom: '0rem', color: '#668fff'}}>Friends</h6>
      {friendlist.map((friend) => {
        const labelId = `checkbox-list-secondary-label-${friend}`;
        return (
          <ListItem
            key={friend.id}        
            disablePadding
          >
            <ListItemButton>
              <ListItemAvatar>
                <Avatar
                  alt={`Avatar n°${friend + 1}`}
                  src={friend.avatar}
                />
              </ListItemAvatar>
              <ListItemText id={labelId} primary={friend.user_name} />
            </ListItemButton>
          </ListItem>
        );
      })}
    </List>
 )
 }