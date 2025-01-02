import React from "react";

import Banner from "../components/homepage/Banner";
import MovieList from "../components/homepage/MovieList";

const HomePage = () => {
  return (
    <>
      <Banner />
      <h1>On Showing Movies</h1>
      <MovieList />
    </>
  );
};

export default HomePage;
