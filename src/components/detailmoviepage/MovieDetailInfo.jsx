import React from "react";
import VideosOfMovie from "./VideosOfMovie";
import CastsOfMovie from "./CastsOfMovie";
import MovieList from "../homepage/MovieList";

const MovieDetailInfo = ({ data, movies, casts }) => {
  return (
    <div className="mx-20 mt-10">
      //? Cast of film
      <CastsOfMovie data={casts} />
      //? Videos of film
      <VideosOfMovie data={data} />
      //? Recommendations
      <MovieList data={movies} title={"Recommendations"} />
    </div>
  );
};

export default MovieDetailInfo;
