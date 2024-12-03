import React from "react";
import VideosOfMovie from "./VideosOfMovie";
import CastsOfMovie from "./CastsOfMovie";
import MovieList from "../homepage/MovieList";

const MovieDetailInfo = ({ data, movies, casts }) => {
  // Định nghĩa hàm onVideoClick
  const onVideoClick = (videoId) => {
    console.log("Video clicked:", videoId);
    // Thêm logic để phát video hoặc thực hiện hành động khác
  };

  return (
    <div className="mx-20 mt-10">
      {/* Cast of film */}
      <CastsOfMovie data={casts} />
      {/* Videos of film */}
      <VideosOfMovie data={data} onVideoClick={onVideoClick} />
      {/* Recommendations */}
      <MovieList data={movies} title={"Recommendations"} />
    </div>
  );
};

export default MovieDetailInfo;
