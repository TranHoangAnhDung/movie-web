import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MovieListAPI from "../api/movieListAPI";
import BannerInfoMovie from "../components/detailmoviepage/BannerInfoMovie";
import MovieDetailInfo from "../components/detailmoviepage/MovieDetailInfo";

const MovieDetail = () => {
  const [movie, setMovie] = useState([]);
  const [videos, setVideos] = useState([]);
  const [casts, setCasts] = useState([]);
  // get param from url
  const param = useParams();
  const { movieID } = param;
  useEffect(() => {
    // call API get movie detail
    const fetchDataMovie = async () => {
      try {
        const [dataMovie, dataVideos,dataCasts] = await Promise.all([
          MovieListAPI.getDetailMovie(movieID),
          MovieListAPI.getVideoTrailer(movieID),
          MovieListAPI.getCasts(movieID)
        ]);
        setMovie(dataMovie);
        setVideos(dataVideos.results);
        setCasts(dataCasts.cast)
        console.log(casts);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchDataMovie();
  }, []);
  return (
    <div>
      <BannerInfoMovie data={movie} />
      <MovieDetailInfo data={videos} movie={movie} casts={casts} />
    </div>
  );
};

export default MovieDetail;
