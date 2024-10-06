import * as api from "./api";
const MovieListAPI = {
  getPopularMovies: () => {
    return api.get("/popular?language=vi&page=1");
  },
  getTopRatedMovies: () => {
    return api.get("/top_rated?language=vi&page=1");
  },
  getVideoTrailer: (movie_id) => {
    return api.get(`/${movie_id}/videos`, {
      language: "vi-VN",
    });
  },
  getDetailMovie: (movie_id) => {
    return api.get(movie_id, { language: "en-US" });
  },
  getCasts: (movie_id) => {
    return api.get(`/${movie_id}/credits`, { language: "en-US" });
  },
  getRecommendations: (movie_id) => {
    return api.get(`/${movie_id}/recommendations`, {
      language: "en-US",
      page: 1,
    });
  },
};
export default MovieListAPI;
