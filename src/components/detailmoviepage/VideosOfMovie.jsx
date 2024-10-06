import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const VideosOfMovie = ({data}) => {
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
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
  return (<>
  <h2 className="uppercase text-3xl font-bold mb-4 text-white">
        Videos and Trailers
      </h2>
      <Carousel
        responsive={responsive}
        className="flex items-center space-x-4 justify-between"
      >
        {data.length > 0 &&
          data.map((item, index) => (
            <div key={index} className="relative flex flex-col my-6">
              <div className="relative h-56 m-2.5 overflow-hidden text-white rounded-md">
                <iframe
                  src={`https://www.youtube.com/embed/${item.key}`}
                  allowFullScreen
                  width="100%"
                  height="100%"
                ></iframe>
              </div>
            </div>
          ))}
      </Carousel>
  </>);
};

export default VideosOfMovie;
