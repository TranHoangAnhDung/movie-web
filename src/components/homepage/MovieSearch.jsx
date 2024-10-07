import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import MovieListAPI from "../../api/movieListAPI";

const MovieSearch = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const params = useParams();
  const { keyword } = params;

  useEffect(() => {
    const searchMovies = async () => {
      if (keyword) {
        setLoading(true);
        setError(null);

        try {
          const response = await MovieListAPI.getMovieSearch(keyword);
          setMovies(response.results);
        } catch (error) {
          setError("Lỗi khi tìm kiếm phim");
        } finally {
          setLoading(false);
        }
      }
    };

    searchMovies();
  }, [keyword]);

  return (
    <div className="bg-black min-h-screen p-4">
      <h1 className="text-3xl text-red-600 mb-4">
        Kết quả tìm kiếm cho: {keyword}
      </h1>

      {loading && <p className="text-white">Đang tìm kiếm...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <div className="mt-4">
        {movies.length > 0 ? (
          <ul className="space-y-4">
            {movies.map((movie) => (
              <li
                key={movie.id}
                className="text-white p-4 rounded-lg shadow-md flex items-center"
              >
                {/* thêm hình ảnh và nút trailer cho moviesearch */}
                <img
                  src={`${import.meta.env.VITE_IMG_URL}${movie.poster_path}`}
                  alt={movie.title}
                  className="w-60 h-auto rounded mr-4"
                />

                <div className="flex flex-col justify-center flex-grow">
                  {" "}
                  <h3 className="text-xl text-white font-semibold">
                    {movie.title}
                  </h3>
                  <p>{movie.overview}</p>
                  <p className="text-gray-300">
                    Ngày phát hành: {movie.release_date}
                  </p>
                  <p className="font-bold text-yellow-400 text-xl leading-10">
                    Rating: {Number(movie.vote_average).toFixed(1)}/10
                  </p>
                  {/* Nút Trailer */}
                  <div className="flex gap-3 mt-2">
                    <button className="p-3 rounded-md bg-red-600 hover:bg-red-800 transition-all font-bold">
                      Trailer <i className="fa fa-video"></i>
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-white">Không tìm thấy phim nào.</p>
        )}
      </div>
    </div>
  );
};

export default MovieSearch;
