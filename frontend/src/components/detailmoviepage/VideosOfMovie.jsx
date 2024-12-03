import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const VideosOfMovie = ({ data, onVideoClick }) => {
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

  return (
    <>
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
                  title={`Video ${index + 1}`} // Thêm title cho iframe
                  src={`https://www.youtube.com/embed/${item.key}`}
                  allowFullScreen
                  width="100%"
                  height="100%"
                  style={{ border: "none" }} // Xóa border nếu không cần thiết
                ></iframe>
              </div>
              <button
                className="absolute bottom-2 left-2 bg-red-600 text-white p-1 rounded"
                onClick={() => onVideoClick(item.key)} // Gọi hàm onVideoClick
              >
                Watch
              </button>
            </div>
          ))}
      </Carousel>
    </>
  );
};

export default VideosOfMovie;
