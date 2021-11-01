import * as React from 'react';
import { Link, Route, Switch } from "react-router-dom";

import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import ListSubheader from '@mui/material/ListSubheader';
import IconButton from '@mui/material/IconButton';
import InfoIcon from '@mui/icons-material/Info';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import place7 from '../assets/img/place7.jpg'
import place6 from '../assets/img/place6.jpeg'
import place8 from '../assets/img/place8.jpeg'
//import Place1 from '../../pages/Place1.js'


const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

function FormRow() {
  return (
    <React.Fragment>
    
      <Grid item xs={4}>
        
      <Link to="#">
        <Item><ImageListItem key={place7} >
        <img
          src={`${place7}?w=365&h=365&fit=crop&auto=format`}
          srcSet={`${place7}?w=365&h=365&fit=crop&auto=format&dpr=2 2x`}
          alt={'Lake Minnewanka Trail'}
          loading="lazy"
        />
        <ImageListItemBar
          title={'Lake Minnewanka Trail'}
          subtitle={'Banff, Alberta, Canada'}
          
        />
        
      </ImageListItem></Item></Link>
      </Grid>

      <Grid item xs={4}>
      <Link to="#">
      <Item><ImageListItem key={place6} >
        
        <img
          src={`${place6}?w=365&h=365&fit=crop&auto=format`}
          srcSet={`${place6}?w=365&h=365&fit=crop&auto=format&dpr=2 2x`}
          alt={'Cascade Ponds'}
          loading="lazy"
        />
        <ImageListItemBar
          title={'Cascade Ponds '}
          subtitle={'Banff, Alberta, Canada'}
          
        />
      
      </ImageListItem></Item>
      </Link>
      </Grid>
      <Grid item xs={4}>
      <Link to="#">
      <Item><ImageListItem key={place8} >
        <img
          src={`${place8}?w=365&h=365&fit=crop&auto=format`}
          srcSet={`${place8}?w=365&h=365&fit=crop&auto=format&dpr=2 2x`}
          alt={'xyx'}
          loading="lazy"
        />
        <ImageListItemBar
          title={'Sulphur Mountain Cosmic Ray Station'}
          subtitle={'Banff, Alberta, Canada'}
          
        />
      </ImageListItem></Item>
      </Link>
      </Grid>
    </React.Fragment>
  );
}

export default function NestedGrid() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={1}>
        <Grid container item spacing={3}>
          <FormRow />
        </Grid>
      
      </Grid>
    </Box>
  );
}



 