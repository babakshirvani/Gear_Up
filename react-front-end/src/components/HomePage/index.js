import React from "react";
import "./styles.css";
import AliceCarousel from 'react-alice-carousel';
import "react-alice-carousel/lib/alice-carousel.css";
import image1 from '../assets/img/1.jpg'
import image2 from '../assets/img/2.jpg'
import image3 from '../assets/img/3.jpg'
import image4 from '../assets/img/4.jpg'

export default function Friendship() {
  return (
    <div className="App">
     <AliceCarousel autoPlay autoPlayInterval="3000">
      <img src={image1} className="sliderimg" alt=""/>
      <img src={image2} className="sliderimg" alt=""/>
      <img src={image3} className="sliderimg" alt=""/>
      <img src={image4} className="sliderimg" alt=""/>
    </AliceCarousel>
    </div>
  );
}