import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

import { useNavigate } from "react-router-dom";
import { BsFillStarFill } from "react-icons/bs";

const MovieCard = (data) => {
  const navigate = useNavigate();
  const { _id, title, genre, rating, portraitImgUrl } = data.Movie;
  const { city } = data.user;

  return (
    <div
      className="rounded-[20px] overflow-hidden shadow-lg w-[95%] h-[400px] flex flex-col mb-[40px] relative cursor-pointer transform transition-transform duration-300 hover:scale-105"
      onClick={() => {
        navigate(`/${city}/movies/${_id}`); // Navigate programmatically
      }}
    >
      <div
        className="bg-cover bg-center w-full h-[300px] relative"
        style={{
          backgroundImage: `url(${portraitImgUrl})`,
        }}
      >
        <p className="absolute bottom-0 w-full text-white py-[10px] px-[10px] bg-gradient-to-t from-black/70 to-transparent flex items-center text-[14px]">
          <BsFillStarFill className="text-yellow-400 mr-[5px]" />
          &nbsp;&nbsp;{rating}/5
        </p>
      </div>
      <div className="p-[10px] bg-white">
        <p className="text-[18px] font-bold text-gray-800 truncate">{title}</p>
        <p className="text-[14px] font-medium text-gray-500">{genre.join(", ")}</p>
      </div>
    </div>
  );
};

// const MovieCard = ({ data, handleTrailer, title }) => {
//   const responsive = {
//     superLargeDesktop: {
//       breakpoint: { max: 4000, min: 3000 },
//       items: 8,
//     },
//     desktop: {
//       breakpoint: { max: 3000, min: 1200 },
//       items: 6,
//     },
//     tablet: {
//       breakpoint: { max: 1200, min: 600 },
//       items: 4,
//     },
//     mobile: {
//       breakpoint: { max: 600, min: 0 },
//       items: 1,
//     },
//   };
//   return (
//     <>
//       <h2 className="uppercase text-3xl font-bold mb-4">{title}</h2>
//       <Carousel responsive={responsive} className="flex items-center space-x-4">
//         {data.length > 0 &&
//           data.map((item) => (
//             <div
//               key={item.id}
//               className="w-[200px] h-[300px] relative group hover:cursor-pointer"
//               onClick={() => handleTrailer(item)}
//             >
//               <div className="group-hover:scale-105 transition-transform duration-500 ease-in-out w-full h-full">
//                 {/* <div className="absolute top-0 left-0 w-full h-full bg-black/40"></div> */}
//                 <img
//                   src={`${import.meta.env.VITE_IMG_URL}${item.poster_path}`}
//                   alt={item.title}
//                   className="w-full h-full object-cover"
//                 />
//               </div>
//             </div>
//           ))}
//       </Carousel>
//     </>
//   );
// };

export default MovieCard;
