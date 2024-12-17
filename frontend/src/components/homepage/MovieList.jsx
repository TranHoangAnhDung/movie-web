import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

import MovieListAPI from "../../api/movieListAPI";
import MovieCard from "./MovieCard";
import MovieTrailerPopUp from "./MovieTrailer";

import {Swiper, SwiperSlide} from "swiper/react"
import {Pagination} from "swiper/modules"
import "swiper/css"
import "swiper/css/pagination"

const MovieList = () => {
  const [user, setUser] = useState(null); 
  const [movies, setMovies] = useState([]);

  const getUser = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/auth/getuser", {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
      });
      const data = await response.json();
      if (data.ok) {
        setUser(data.data); // Update user state with fetched data
      } else {
        window.location.href = '/Login'; // Redirect if user isn't logged in
      }
    } catch (error) {
      console.error('Error fetching user:', error);
    }
  };

  const getMovies = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/movie/movies", {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();      
      if (data.ok) {
        setMovies(data.data); // Update movies state with fetched data
      }
    } catch (error) {
      console.error('Error fetching movies:', error);
    }
  };

  useEffect(() => {
    getMovies();
    getUser();
  }, []);

  return (
    <div className="p-4 bg-gray-50 rounded-lg shadow-md">
      {movies.length > 0 && user && (
        <Swiper
          slidesPerView={1}
          spaceBetween={1}
          pagination={{
            clickable: true,
          }}
          breakpoints={{
            '@0.00': {
              slidesPerView: 1,
              spaceBetween: 2,
            },
            '@0.75': {
              slidesPerView: 2,
              spaceBetween: 2,
            },
            '@1.00': {
              slidesPerView: 3,
              spaceBetween: 2,
            },
            '@1.50': {
              slidesPerView: 6,
              spaceBetween: 2,
            },
          }}
          modules={[Pagination]}
          className="p-4 bg-gradient-to-b from-gray-50 via-white to-gray-100 rounded-lg shadow-lg"
        >
          {movies.map((Movie) => (
            <SwiperSlide key={Movie._id}>
              <MovieCard Movie={Movie} user={user} />
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  );
};

// const MovieList = ({ title, data }) => {
//   const [modalIsOpen, setModalIsOpen] = useState(false);
//   const [selectMovie, setSelectMovie] = useState({});
//   const [trailerKey, setTrailerKey] = useState("");

//   const handleTrailer = async (movie) => {
//     try {
//       //call api get data
//       const videos = await MovieListAPI.getVideoTrailer(movie.id);
//       //set data to State
//       const videoTrailer = videos.results.find(
//         (trailer) =>
//           trailer.type === "Trailer" || trailer.type === "Original Trailer"
//       );
//       setSelectMovie(movie);
//       setTrailerKey(videoTrailer.key);
//       //open video
//       setModalIsOpen(true);
//     } catch (error) {
//       //catch error
//       setModalIsOpen(false);
//       console.log(error);
//     }
//   };
//   //handle Click button detail
//   const handleClickBtnDetail = () => {
//     setModalIsOpen(false);
//   }
//   return (
//     <div className="text-white mb-10">
//       {/* //Show movie */}
//       <MovieCard handleTrailer={handleTrailer} data={data} title={title} />
//       {/* //Pop up trailer */}
//       <MovieTrailerPopUp
//         modalIsOpen={modalIsOpen}
//         selectMovie={selectMovie}
//         trailerKey={trailerKey}
//         setModalIsOpen={setModalIsOpen}
//         handleClickBtnDetail={handleClickBtnDetail}
//       />
//     </div>
//   );
// };

// MovieList.propTypes = {
//   title: PropTypes.string,
//   data: PropTypes.array,
// };

export default MovieList;
