import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MovieListAPI from "../api/movieListAPI";
import BannerInfoMovie from "../components/detailmoviepage/BannerInfoMovie";
import MovieDetailInfo from "../components/detailmoviepage/MovieDetailInfo";
import BackToPrePage from "../components/detailmoviepage/BackToPrePage";
import Loading from "../components/loading/Loading";

const MovieDetail = () => {
  const [movie, setMovie] = useState([]);
  const [videos, setVideos] = useState([]);
  const [casts, setCasts] = useState([]);
  const [recommendMovie, setRecommendMovie] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const param = useParams();
  const { movieID } = param;

  useEffect(() => {
    window.scrollTo(0, 0);
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
      } catch (error) {
        console.log(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchDataMovie();
  }, [movieID]);

  // Hàm xử lý click vào video
  const onVideoClick = (key) => {
    window.open(`https://www.youtube.com/watch?v=${key}`, "_blank");
  };

  return isLoading ? (
    <div className="text-white flex items-center justify-center py-10">
      <Loading />
    </div>
  ) : (
    <div className="">
      {/* Cập nhật dòng này */}
      <BannerInfoMovie data={movie} videos={videos} />
      <MovieDetailInfo
        data={videos}
        movies={recommendMovie}
        casts={casts}
        onVideoClick={onVideoClick} // Truyền hàm vào đây
      />
      <BackToPrePage />
    </div>
  );
};

export default MovieDetail;
