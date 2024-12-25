import express from "express";

import {
  addCelebToMovie,
  addMovieScheduleToScreen,
  bookTicket,
  createMovie,
  createScreen,
  getAvailableDates,
  getMovies,
  getMoviesId,
  getScheduleByMovies,
  getSchedules,
  getScreensByCity,
  getScreensByMoviesSchedule,
  getUserBookings,
  getUserBookingsId,
  removeMovie,
  removeScreen,
  updateMovie,
  updateScreen,
} from "../controllers/movieController.js";

import authAdminToken from "../middleware/checkAdminToken.js";
import authToken from "../middleware/checkAuthToken.js";

const Router = express.Router();

{ /* ADMIN ACCESS */ }
Router.route("/movieschedules").get(getSchedules)

Router.route("/createmovie").post(authAdminToken, createMovie);
Router.route("/createscreen").post(authAdminToken, createScreen);
Router.route("/removemovie").post(authAdminToken, removeMovie);
Router.route("/removescreen").post(authAdminToken, removeScreen)
Router.route("/addmoviescheduletoscreen").post(
  authAdminToken,
  addMovieScheduleToScreen
);
Router.route("/addceleb").post(authAdminToken, addCelebToMovie)

Router.route("/updatemovie/:id").put(authAdminToken, updateMovie)
Router.route("/updatescreen/:id").put(authAdminToken, updateScreen)

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
Router.route("/getavailabledates/:city/:movieid").get(getAvailableDates)

export default Router;
