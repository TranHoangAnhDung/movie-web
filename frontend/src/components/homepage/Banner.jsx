import React from "react";
import Carousel from "react-multi-carousel";

const Banner = () => {
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1,
      slidesToSlide: 1, // Number of slides to scroll
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1,
      slidesToSlide: 1,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1,
    },
  };

  const images = [
    "https://res.cloudinary.com/dm8km2abq/image/upload/c_fill,w_360,h_150/v1734789742/movie-banner_b7mckv.jpg",
    "https://res.cloudinary.com/dm8km2abq/image/upload/c_fill,w_360,h_150/v1735829984/cinema-banner_afhlxf.jpg",
  ];

  return (
    <div className="bg-black py-8">
      <div className="container mx-auto px-7">
        <Carousel
          responsive={responsive}
          infinite={true}
          autoPlay={false}
          keyBoardControl={true}
          showDots={true}
          arrows={true}
          containerClass="carousel-container"
          itemClass="carousel-item"
          dotListClass="custom-dot-list-style"
          className="rounded-lg overflow-hidden shadow-lg"
        >
          {images.map((image, index) => (
            <div key={index} className="relative">
              <img
                src={image}
                alt={`Banner ${index + 1}`}
                className="w-full h-[450px] object-contain md:object-cover"
              />
            </div>
          ))}
        </Carousel>
      </div>
    </div>
  );
};

export default Banner;
