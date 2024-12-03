import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const CastsOfMovie = ({ data }) => {
  const responsive = {
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
    <>
      <h2 className="uppercase text-3xl font-bold my-4 text-white">
        Featured Cast
      </h2>
      <Carousel responsive={responsive} className="flex items-center space-x-4">
        {data.length > 0 &&
          data.map((item, index) => (
            <div key={index} className="flex flex-col bg-black rounded-lg my-6">
              <div className="m-2.5 overflow-hidden rounded-md h-80 flex justify-center items-center text-white">
                {!item.profile_path ? (
                  "Don't have image of Cast"
                ) : (
                  <img
                    className="w-full h-full object-cover "
                    src={`${import.meta.env.VITE_IMG_URL}${item.profile_path}`}
                    alt="profile-picture"
                  />
                )}
              </div>
              <div className="p-6 text-center">
                <h4 className="mb-1 text-xl font-semibold text-slate-200">
                  {item.name || item.original_name}
                </h4>
                <p className="text-sm font-semibold text-slate-500 uppercase">
                  {item.character || item.known_for_department}
                </p>
              </div>
            </div>
          ))}
      </Carousel>
    </>
  );
};

export default CastsOfMovie;
