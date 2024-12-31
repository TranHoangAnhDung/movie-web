import React, { useState, useEffect } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

import MovieCard from "./MovieCard";

const MovieList = () => {
  const [user, setUser] = useState(null);
  const [movies, setMovies] = useState([]);

  const getUser = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/auth/getuser", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = await response.json();
      if (data.ok) {
        setUser(data.data); // Update user state with fetched data
      } else {
        window.location.href = "/Login"; // Redirect if user isn't logged in
      }
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };

  const getMovies = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/movie/movies", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      if (data.ok) {
        setMovies(data.data); // Update movies state with fetched data
      }
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };

  useEffect(() => {
    getMovies();
    getUser();
  }, []);

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4, // Show 4 movies on large screens
      slidesToSlide: 4, // Slide 4 at a time
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2, // Show 2 movies on medium screens
      slidesToSlide: 2, // Slide 2 at a time
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1, // Show 1 movie on small screens
      slidesToSlide: 1, // Slide 1 at a time
    },
  };

  return (
    <div className="rounded-lg shadow-md relative my-10">
      {movies.length > 0 && user && (
        <>
          <Carousel
            responsive={responsive}
            infinite={false}
            arrows={true}
            showDots={false}
            autoPlay={false}
            customTransition="all 0.5s"
            transitionDuration={500}
            containerClass="carousel-container"
            itemClass="carousel-item-padding-40-px"
          >
            
              {movies.map((Movie) => (
                <div key={Movie._id} className="flex flex-row justify-between gap-4">
                  <MovieCard Movie={Movie} user={user} />
                </div>
              ))}
          
          </Carousel>

        </>
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
