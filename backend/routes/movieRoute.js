import express from "express";

import {
  addCelebToMovie,
  addMovieScheduleToScreen,
  bookTicket,
  cancelBooking,
  createMovie,
  createScreen,
  getAvailableDates,
  getMovies,
  getMoviesId,
  getScheduleByMovies,
  getScreensByCity,
  getScreensByMoviesSchedule,
  getUserBookings,
  getUserBookingsId,
  removeMovie,
  updateMovie,
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
Router.route("/addceleb").post(authAdminToken, addCelebToMovie)

Router.route("/update/:id").put(authAdminToken, updateMovie)

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
Router.route("/cancelbooking/:bookingid").delete(authToken, cancelBooking)

export default Router;
