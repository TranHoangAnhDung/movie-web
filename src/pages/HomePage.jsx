import React from "react";
import { useState, useEffect } from "react";

import Banner from "../components/homepage/Banner";
import MovieList from "../components/homepage/MovieList";
import MovieListAPI from "../api/movieListAPI";

const HomePage = () => {
  const [movie, setMovie] = useState([]);
  const [movieRate, setMovieRate] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const [res1, res2] = await Promise.all([
          MovieListAPI.getPopularMovies(),
          MovieListAPI.getTopRatedMovies(),
        ]);
        setMovie(res1.results);
        setMovieRate(res2.results);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchMovies();
  }, []);

  return (
    <>
      <Banner />
      <MovieList title={"Phim Hot"} data={movie} />
      <MovieList title={"Phim Đề Cử"} data={movieRate} />
    </>
  );
};

export default HomePage;
