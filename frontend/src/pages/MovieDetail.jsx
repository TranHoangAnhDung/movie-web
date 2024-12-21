import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import MovieListAPI from "../api/movieListAPI";
import BannerInfoMovie from "../components/detailmoviepage/BannerInfoMovie";
import MovieDetailInfo from "../components/detailmoviepage/MovieDetailInfo";
import BackToPrePage from "../components/detailmoviepage/BackToPrePage";
import Loading from "../components/loading/Loading";

import { BsShare, BsFillStarFill } from "react-icons/bs";
import MovieList from "../components/homepage/MovieList";
import CelebCard from "../components/detailmoviepage/CelebCard";
import "swiper/css";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";

const MovieDetail = () => {
  const { movieid, city } = useParams(); // Get movie ID from URL

  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);

  const getMovie = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/movie/movies/${movieid}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      if (data.ok) {
        setMovie(data.data);
      } else {
        console.error("Failed to fetch movie data:", data.message);
      }
    } catch (err) {
      console.error("Error fetching movie:", err);
    }
  };

  useEffect(() => {
    getMovie();
  }, [movieid]);

  return (
    <>
      {movie && (
        <div className="flex flex-col">
          <div
            className="bg-no-repeat bg-cover bg-center"
            style={{
              backgroundImage: `url(${movie.landscapeImgUrl})`,
            }}
          >
            <div className="bg-gradient-to-r from-black via-transparent to-black min-h-[50vh] p-12 flex justify-between">
              <div className="flex items-center gap-5">
                <div
                  className="w-[300px] h-[400px] rounded-lg overflow-hidden relative bg-no-repeat bg-cover bg-center"
                  style={{
                    backgroundImage: `url(${movie.portraitImgUrl})`,
                  }}
                >
                  <p className="absolute bottom-0 bg-black text-white text-center w-full py-1 text-sm">
                    In cinemas
                  </p>
                </div>
                <div className="flex flex-col text-white gap-3">
                  <p className="text-4xl font-semibold">{movie.title}</p>
                  <p className="text-3xl font-semibold flex items-center gap-1">
                    <BsFillStarFill className="text-yellow-500 mb-2" />
                    &nbsp;&nbsp;{movie.rating}/5
                  </p>
                  <p className="text-lg font-medium mb-2">
                    <i className="fa fa-clock text-yellow-500 px-2"></i>
                    {movie.duration} mins
                  </p>
                  <p className="text-lg font-medium mb-4 text-gray-300">
                    <i className="fa fa-tag text-yellow-500 px-2"></i>
                    {movie.genre.join(", ")}
                  </p>
                  <button
                    className="bg-yellow-500 text-white rounded-md px-16 py-2 text-lg font-normal"
                    onClick={() =>
                      navigate(`/${city}/movies/${movieid}/buytickets`)
                    } // Redirect to the booking page
                  >
                    Book Tickets
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="px-12 pt-5 flex flex-col gap-3 w-full">
            <h1 className="text-2xl font-semibold text-blue-700">
              About the Movie
            </h1>
            <p className="text-lg font-normal text-gray-500">
              {movie.description}
            </p>
            {movie.cast.length > 0 && (
              <div>
                <div className="w-full h-[1px] bg-gray-200 my-8"></div>
                <h1 className="text-2xl font-semibold text-blue-700">Cast</h1>
                <Swiper
                  slidesPerView={1}
                  spaceBetween={1}
                  pagination={{ clickable: true }}
                  breakpoints={{
                    "@0.00": {
                      slidesPerView: 1,
                      spaceBetween: 2,
                    },
                    "@0.75": {
                      slidesPerView: 2,
                      spaceBetween: 2,
                    },
                    "@1.00": {
                      slidesPerView: 3,
                      spaceBetween: 2,
                    },
                    "@1.50": {
                      slidesPerView: 6,
                      spaceBetween: 2,
                    },
                  }}
                  modules={[Pagination]}
                  className="mySwiper"
                >
                  {movie.cast.map((cast, index) => (
                    <SwiperSlide key={index}>
                      <CelebCard
                        imageUrl={cast.celebImage} // Map the schema field `celebImage` to `imageUrl`
                        name={cast.celebName} // Map the schema field `celebName` to `name`
                        role={cast.celebRole}
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            )}

            <div className="w-full h-[1px] bg-gray-200 my-8"></div>
            <h1 className="text-2xl font-semibold text-blue-700">
              Your might also like
            </h1>
            <MovieList />
          </div>
        </div>
      )}
    </>
  );
};
// const MovieDetail = () => {
//   const [movie, setMovie] = useState([]);
//   const [videos, setVideos] = useState([]);
//   const [casts, setCasts] = useState([]);
//   const [recommendMovie, setRecommendMovie] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const param = useParams();
//   const { movieID } = param;

//   useEffect(() => {
//     window.scrollTo(0, 0);
//     const fetchDataMovie = async () => {
//       try {
//         setIsLoading(true);
//         const [dataMovie, dataVideos, dataCasts, dataRecommend] =
//           await Promise.all([
//             MovieListAPI.getDetailMovie(movieID),
//             MovieListAPI.getVideoTrailer(movieID),
//             MovieListAPI.getCasts(movieID),
//             MovieListAPI.getRecommendations(movieID),
//           ]);
//         setMovie(dataMovie);
//         setVideos(dataVideos.results);
//         setCasts(dataCasts.cast);
//         setRecommendMovie(dataRecommend.results);
//       } catch (error) {
//         console.log(error.message);
//       } finally {
//         setIsLoading(false);
//       }
//     };
//     fetchDataMovie();
//   }, [movieID]);

//   // Hàm xử lý click vào video
//   const onVideoClick = (key) => {
//     window.open(`https://www.youtube.com/watch?v=${key}`, "_blank");
//   };

//   return isLoading ? (
//     <div className="text-white flex items-center justify-center py-10 mb-40">
//       <Loading />
//     </div>
//   ) : (
//     <div className="">
//       {/* Cập nhật dòng này */}
//       <BannerInfoMovie data={movie} videos={videos} />
//       <MovieDetailInfo
//         data={videos}
//         movies={recommendMovie}
//         casts={casts}
//         onVideoClick={onVideoClick} // Truyền hàm vào đây
//       />
//       <BackToPrePage />
//     </div>
//   );
// };

export default MovieDetail;
