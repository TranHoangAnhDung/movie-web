import React from "react";
import Carousel from "react-multi-carousel";
import YouTube from "react-youtube";
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
            <div
              key={index}
              className=" relative group hover:cursor-pointer"
              //   onClick={() => handleTrailer(item)}
            >
              <div className="w-full h-full">
                <iframe
                  src={`https://www.youtube.com/embed/${item.key}`}
                  height="100%"
                  allowfullscreen
                ></iframe>
                {/* <div className="absolute bottom-4 left-2">
                  <p className="uppercase text-md">{item.type}</p>
                </div> */}
              </div>
            </div>
          ))}
      </Carousel>
      <h2 className="uppercase text-3xl font-bold mb-4 text-white">
        Featured Cast
      </h2>
      <Carousel responsive={responsive2} className="flex items-center space-x-4">
        {casts.length > 0 &&
          casts.map((item, index) => (
            <div
              key={index}
              className=""
              //   onClick={() => handleTrailer(item)}
            >
              <div className="w-full h-full flex flex-col">
                <div className="basis-2/3">
                  <img
                    src={`${import.meta.env.VITE_IMG_URL}${item.profile_path}`}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="basis-1/3">
                  <p className="uppercase text-md text-white">{item.name}</p>
                </div>
              </div>
            </div>
          ))}
      </Carousel>

      <div></div>
    </div>
  );
};

export default MovieDetailInfo;
