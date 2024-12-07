import express from "express";

import {
  addMovieScheduleToScreen,
  bookTicket,
  createMovie,
  createScreen,
  getMovies,
  getMoviesId,
  getScheduleByMovies,
  getScreensByCity,
  getScreensByMoviesSchedule,
  getUserBookings,
  getUserBookingsId,
  removeMovie,
} from "../controllers/movieController.js";

import authAdminToken from "../middleware/checkAdminToken.js";
import authToken from "../middleware/checkAuthToken.js";

const Router = express.Router();

{ /* ADMIN ACCESS */ }
Router.route("/createmovie").post(authAdminToken, createMovie);
Router.route("/remove").post(authAdminToken, removeMovie);
Router.route("/createscreen").post(authAdminToken, createScreen);
Router.route("/addmoviescheduletoscreen").post(
  authAdminToken,
  addMovieScheduleToScreen
);

{ /* USER ACCESS */ }
Router.route("/bookticket").post(authToken, bookTicket);

Router.route("/movies").get(getMovies);
Router.route("/movies/:id").get(getMoviesId);
Router.route("/screensbycity/:city").get(getScreensByCity);
Router.route("/screensbymovieschedule/:city/:date/:movieid").get(
  getScreensByMoviesSchedule
);
Router.route("/schedulebymovie/:screenid/:date/:movieid").get(
  getScheduleByMovies
);
Router.route("/getuserbookings").get(authToken, getUserBookings);
Router.route("/getuserbookings/:id").get(authToken, getUserBookingsId);

// Router.post("/add", upload.fields([{name:"image1", maxCount:1},{name:"image2", maxCount:1},{name:"image3", maxCount:1}, {name:"image4", maxCount:1}]), addMovie)
// Router.post("/createmovie", createMovie)
// Router.post("/single", singleMovie)
// Router.get("/list", listMovie)

export default Router;
