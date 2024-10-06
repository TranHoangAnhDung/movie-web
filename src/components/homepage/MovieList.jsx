import React, { useState } from "react";
import PropTypes from "prop-types";

import MovieListAPI from "../../api/movieListAPI";
import MovieCard from "./MovieCard";
import MovieTrailerPopUp from "./MovieTrailer";

const MovieList = ({ title, data }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectMovie, setSelectMovie] = useState({});
  const [trailerKey, setTrailerKey] = useState("");

  const handleTrailer = async (movie) => {
    try {
      //call api get data
      const videos = await MovieListAPI.getVideoTrailer(movie.id);
      //set data to State
      const videoTrailer = videos.results.find(
        (trailer) =>
          trailer.type === "Trailer" || trailer.type === "Original Trailer"
      );
      setSelectMovie(movie);
      setTrailerKey(videoTrailer.key);
      //open video
      setModalIsOpen(true);
    } catch (error) {
      //catch error
      setModalIsOpen(false);
      console.log(error);
    }
  };
  //handle Click button detail
  const handleClickBtnDetail = () => {
    setModalIsOpen(false);
  }
  return (
    <div className="text-white mb-10">
      {/* //Show movie */}
      <MovieCard handleTrailer={handleTrailer} data={data} title={title} />
      {/* //Pop up trailer */}
      <MovieTrailerPopUp
        modalIsOpen={modalIsOpen}
        selectMovie={selectMovie}
        trailerKey={trailerKey}
        setModalIsOpen={setModalIsOpen}
        handleClickBtnDetail={handleClickBtnDetail}
      />
    </div>
  );
};

MovieList.propTypes = {
  title: PropTypes.string,
  data: PropTypes.array,
};

export default MovieList;
