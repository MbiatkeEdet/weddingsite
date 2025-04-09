import React from "react";
import Slider from "react-slick";

const ImageSlider = () => {
  // Array of image URLs
  const images = [
    "/public/OurPicture.jpg",
    "/images/image2.jpg",
    "/images/image3.jpg",
    "/images/image4.jpg",
  ];

  // Slider settings
  const settings = {
    dots: true, // Show dot indicators
    infinite: true, // Infinite looping
    speed: 500, // Transition speed
    slidesToShow: 1, // Number of slides to show at once
    slidesToScroll: 1, // Number of slides to scroll
    autoplay: true, // Auto-play the slideshow
    autoplaySpeed: 3000, // Auto-play speed in milliseconds
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      <Slider {...settings}>
        {images.map((image, index) => (
          <div key={index} className="outline-none">
            <img
              src={image}
              alt={`Slide ${index + 1}`}
              className="w-full h-auto rounded-lg shadow-lg"
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default ImageSlider;