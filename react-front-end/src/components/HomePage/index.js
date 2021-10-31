import React from "react";
//import "./styles.css";
import AliceCarousel from 'react-alice-carousel';
import "react-alice-carousel/lib/alice-carousel.css";
import image1 from '../assets/img/5.jpeg'
import image2 from '../assets/img/2.jpg'
import image3 from '../assets/img/3.jpg'
import image6 from '../assets/img/6.jpeg'
import PopularTrails from './PopularTrails'
import { padding } from "@mui/system";



export default function Friendship() {
  return (
    
    <div className="">
     <AliceCarousel autoPlay autoPlayInterval="3000">
      <img src={image1} className="sliderimg" alt=""/>
      <img src={image2} className="sliderimg" alt=""/>
      <img src={image3} className="sliderimg" alt=""/>
      <img src={image6} className="sliderimg" alt=""/>
    </AliceCarousel>
    <div className="container">
    <h3 style={{textAlign:"center",padding:10}}>POPULAR PLACES</h3>
      <PopularTrails/>
    </div>
    </div>
  );
}