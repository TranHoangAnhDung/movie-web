import HomePage from "../pages/HomePage";
import Movie from "../pages/Movie";
import MovieDetail from "../pages/MovieDetail";

const setupRouter = [
  { url: "/", component: HomePage  },
  { url: "/:movieID", component: MovieDetail  },
  { url: "/xemphim/:movieID", component: Movie  },

];
export { setupRouter };
