import React from "react";
import Carousel from "react-multi-carousel";
import LazyLoad from "react-lazyload"; // Import LazyLoad
import "react-multi-carousel/lib/styles.css";

const MovieDetailInfo = ({ data, movie, casts }) => {
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 4,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1200 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1200, min: 600 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 600, min: 0 },
      items: 1,
    },
  };

  const responsive2 = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 7,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1200 },
      items: 5,
    },
    tablet: {
      breakpoint: { max: 1200, min: 600 },
      items: 3,
    },
    mobile: {
      breakpoint: { max: 600, min: 0 },
      items: 1,
    },
  };

  return (
    <div className="mx-20 mt-10">
      <h2 className="uppercase text-3xl font-bold mb-4 text-white">
        Videos and Trailers
      </h2>
      <Carousel responsive={responsive} className="flex items-center space-x-4">
        {data.length > 0 &&
          data.map((item, index) => (
            <div key={index} className="relative group hover:cursor-pointer">
              <LazyLoad height={200} offset={100}>
                <iframe
                  src={`https://www.youtube.com/embed/${item.key}`}
                  height="100%"
                  allowFullScreen
                  title={`Video ${index + 1}`} // Thêm title cho iframe
                ></iframe>
              </LazyLoad>
            </div>
          ))}
      </Carousel>

      <h2 className="uppercase text-3xl font-bold mb-4 text-white mt-8">
        Featured Cast
      </h2>
      <Carousel
        responsive={responsive2}
        className="flex items-center space-x-4"
      >
        {casts.length > 0 &&
          casts.map((item, index) => (
            <div key={index} className="flex flex-col items-center">
              {/* chỉnh lại css cho casts để tối ưu hóa loading */}
              <div className="relative w-40 h-40 overflow-hidden rounded-full border-4 border-yellow-500 shadow-lg">
                <img
                  src={`${import.meta.env.VITE_IMG_URL}${item.profile_path}`}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="uppercase text-md text-white mt-2">{item.name}</p>
            </div>
          ))}
      </Carousel>
    </div>
  );
};

export default MovieDetailInfo;
