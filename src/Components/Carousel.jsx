// eslint-disable-next-line no-unused-vars
import React from 'react';
import Slider from 'react-slick';
import image1 from '../Images/product1.jpg';
import image2 from '../Images/product2.jpg';
import image3 from '../Images/product3.jpg';
import image4 from '../Images/product4.jpg';
import image5 from '../Images/product5.jpg';


const Carousel = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5, // Number of slides to show at a time
    slidesToScroll: 1, // Number of slides to scroll
  };

  return (
    <div>
      <Slider {...settings}>
        <div>
          <img src={image1} alt="Image 1" />
        </div>
        <div>
          <img src={image2} alt="Image 2" />
        </div>
        <div>
          <img src={image3} alt="Image 3" />
        </div>
        <div>
          <img src={image4} alt="Image 2" />
        </div>
        <div>
          <img src={image5} alt="Image 3" />
        </div>
      </Slider>
    </div>
  );
};

export default Carousel;