import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const images = [
  "https://media.istockphoto.com/id/1310289685/photo/mother-and-daughter-planting-flowers-in-garden.jpg?s=612x612&w=0&k=20&c=fNZ1OGCiGe41jIV3_yB3Q08LhPnif-Km4HJlkOmwH7U=",
  "https://www.bhg.com/thmb/fYKiVDhNg_XSUIQAyzFFsaSiFO0=/4000x0/filters:no_upscale():strip_icc()/garden-4fcf0177f89447b1b9868a76ac84990d.jpg",
  "https://img.freepik.com/premium-photo/different-beautiful-indoor-plants-room-house-decoration_1033579-213278.jpg",
  "https://www.crescent-builders.com/blog/wp-content/uploads/2020/09/d.jpg",
];

const Carousel = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div className="relative w-full max-w-screen-lg mx-auto">
      <Slider {...settings}>
        {images.map((image, index) => (
          <div key={index} className="px-2">
            <img
              src={image}
              alt={`Carousel slide ${index + 1}`}
              className="w-full h-48 sm:h-64 md:h-80 lg:h-96 object-cover rounded-lg shadow-lg"
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Carousel;