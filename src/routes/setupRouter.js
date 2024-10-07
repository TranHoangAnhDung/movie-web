import MovieSearch from "../components/homepage/MovieSearch";
import HomePage from "../pages/HomePage";
import MovieDetail from "../pages/MovieDetail";

const setupRouter = [
  { url: "/", component: HomePage },
  { url: "/:movieID", component: MovieDetail },
  { url: "/search/:keyword", component: MovieSearch },
];
export { setupRouter };
