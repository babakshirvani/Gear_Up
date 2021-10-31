import React from 'react'
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import place7 from '../components/assets/img/place7.jpg'
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import './PopularPlace1.css'
//import place6 from '../assets/img/place6.jpeg'
//import place8 from '../assets/img/place8.jpeg'

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const About = () => {
  return (
    
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Item><img className="place1img"
          src={`${place7}`}
          srcSet={`${place7}`}
          alt={'Lake Minnewanka Trail'}
          loading="lazy"
        />
        <ImageListItemBar className="imgdescription"
          title={'Lake Minnewanka Trail'}
          subtitle={'Banff, Alberta, Canada'}
          
        />
        
      
        </Item>
          </Grid>
          <Grid item xs={12}>
            <Item><h5 style={{textAlign:'justify'}}>Mount Athabasca is a 12.2 kilometer lightly trafficked out and back trail located near Improvement District No. 12 , Alberta, Canada that offers scenic views and is only recommended for very experienced adventurers. 
              The trail is primarily used for rock climbing and is best used from June until August.</h5></Item>
          </Grid>
          <Grid item xs={4}>
            <Item>xs=4</Item>
          </Grid>
          <Grid item xs={8}>
            <Item>xs=8</Item>
          </Grid>
        </Grid>
      </Box>
    
  )
}
export default About;