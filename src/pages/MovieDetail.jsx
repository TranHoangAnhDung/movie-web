import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MovieListAPI from "../api/movieListAPI";
import BannerInfoMovie from "../components/detailmoviepage/BannerInfoMovie";
import MovieDetailInfo from "../components/detailmoviepage/MovieDetailInfo";
import ScrollToTop from "../components/detailmoviepage/ScrollToTop";
import BackToPrePage from "../components/detailmoviepage/BackToPrePage";
import Loading from "../components/loading/Loading";

const MovieDetail = () => {
  const [movie, setMovie] = useState([]);
  const [videos, setVideos] = useState([]);
  const [casts, setCasts] = useState([]);
  const [recommendMovie, setRecommendMovie] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  // get param from url
  const param = useParams();
  const { movieID } = param;
  useEffect(() => {
    window.scrollTo(0, 0);
    // call API get movie detail
    const fetchDataMovie = async () => {
      try {
        setIsLoading(true);
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
      } finally {
        setIsLoading(false);
      }
    };
    fetchDataMovie();
  }, [movieID]);
  return isLoading ? (
    <div className="text-white flex items-center justify-center py-10"><Loading /></div>
  ) : (
    <div className="">
      <BannerInfoMovie data={movie} />
      <MovieDetailInfo data={videos} movies={recommendMovie} casts={casts} />
      <ScrollToTop />
      <BackToPrePage />
    </div>
  );
};

export default MovieDetail;
