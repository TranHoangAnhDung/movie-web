import MovieSearch from "../components/homepage/MovieSearch";
import HomePage from "../pages/HomePage";
import Movie from "../pages/Movie";
import MovieDetail from "../pages/MovieDetail";

const setupRouter = [
  { url: "/", component: HomePage  },
  { url: "/:movieID", component: MovieDetail  },
  { url: "/xemphim/:movieID", component: Movie  },
  { url: "/search/:keyword", component: MovieSearch },
];
export { setupRouter };
