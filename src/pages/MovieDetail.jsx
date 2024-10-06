import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MovieListAPI from "../api/movieListAPI";
import BannerInfoMovie from "../components/detailmoviepage/BannerInfoMovie";
import MovieDetailInfo from "../components/detailmoviepage/MovieDetailInfo";
import ScrollToTop from "../components/detailmoviepage/ScrollToTop";
import BackToPrePage from "../components/detailmoviepage/BackToPrePage";

const MovieDetail = () => {
  const [movie, setMovie] = useState([]);
  const [videos, setVideos] = useState([]);
  const [casts, setCasts] = useState([]);
  const [recommendMovie, setRecommendMovie] = useState([]);
  // get param from url
  const param = useParams();
  const { movieID } = param;
  useEffect(() => {
    window.scrollTo(0,0)
    // call API get movie detail
    const fetchDataMovie = async () => {
      try {
        const [dataMovie, dataVideos, dataCasts, dataRecommend] =
          await Promise.all([
            MovieListAPI.getDetailMovie(movieID),
            MovieListAPI.getVideoTrailer(movieID),
            MovieListAPI.getCasts(movieID),
            MovieListAPI.getRecommendations(movieID),
          ]);
        setMovie(dataMovie);
        setVideos(dataVideos.results);
        setCasts(dataCasts.cast);
        setRecommendMovie(dataRecommend.results);
        console.log(casts);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchDataMovie();
  }, [movieID]);
  return (
    <div className="">
      <BannerInfoMovie data={movie} />
      <MovieDetailInfo data={videos} movies={recommendMovie} casts={casts} />
      <ScrollToTop />
      <BackToPrePage/>
    </div>
  );
};

export default MovieDetail;
