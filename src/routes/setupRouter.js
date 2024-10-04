import HomePage from "../pages/HomePage";
import MovieDetail from "../pages/MovieDetail";

const setupRouter = [
  { url: "/", component: HomePage  },
  { url: "/:movieID", component: MovieDetail  },
];
export { setupRouter };
