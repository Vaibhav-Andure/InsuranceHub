import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import './corousel.css'

function Testimonials({imgsrc , text}) {
  return (
    <Carousel className="testimonial-carousel" interval={1000}>
      <Carousel.Item>
        <div className="carousel-item-wrapper">
          <img className="d-block w-100 testimonial-image" src={imgsrc} alt="testimonial" />
        </div>
        <Carousel.Caption className="testimonial-caption">
          <h3>{text}</h3>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default Testimonials;
