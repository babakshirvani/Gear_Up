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



export default function InteractiveList() {

  const [friendlist, setFriendlist] = useState([]);

  useEffect(()=>{
    const user_id=localStorage.getItem('user_id')
    axios.get(`api/friendlist/${user_id}`)
    .then((res)=>{
      setFriendlist([...res.data]);
    })
  },[])

  return (
    <List dense sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper', borderRadius: '10px' }}>
      <h6 style={{padding: '10px',borderBottom: '1px black solid'}}>FRIENDLIST</h6>
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