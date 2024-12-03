import About from "../components/homepage/About";
import Contact from "../components/homepage/Contact";
import MovieSearch from "../components/homepage/MovieSearch";
import HomePage from "../pages/HomePage";
import Login from "../pages/Login";
import Movie from "../pages/Movie";
import MovieDetail from "../pages/MovieDetail";

const setupRouter = [
  { url: "/", component: HomePage },
  { url: "/:movieID", component: MovieDetail },
  { url: "/xemphim/:movieID", component: Movie },
  { url: "/search/:keyword", component: MovieSearch },
  { url: "/About", component: About },
  { url: "/Contact", component: Contact },
  { url: "/Login", component: Login}
];
export { setupRouter };
