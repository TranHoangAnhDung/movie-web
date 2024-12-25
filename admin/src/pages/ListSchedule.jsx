import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

import { backendUrl } from "../App";

const ListSchedule = () => {
  const [schedules, setSchedules] = useState([]);
  const [filteredSchedules, setFilteredSchedules] = useState([]);

  // Lọc Movie //
  const [movieNames, setMovieNames] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState("");

  // Lọc Cinema //
  const [screenNames, setScreenNames] = useState([]);
  const [selectedScreen, setSelectedScreen] = useState("");

  const fetchSchedules = async () => {
    try {
      const response = await axios.get(
        `${backendUrl}/api/movie/movieschedules`
      );

      if (response.data.ok && response.data.data.length > 0) {
        setSchedules(response.data.data);
        setFilteredSchedules(response.data.data);

        const uniqueMovies = [
          ...new Set(response.data.data.map((schedule) => schedule.movieName)),
        ];
        setMovieNames(uniqueMovies);

        const uniqueScreens = [
          ...new Set(response.data.data.map((schedule) => schedule.screenName)),
        ];
        setScreenNames(uniqueScreens);

        toast.success(response.data.message);
      } else {
        toast.warn("No schedules available");
      }
    } catch (error) {
      toast.error("Error fetching movie schedules");
    }
  };

  const handleFilterChange = (movieName, screenName) => {
    setSelectedMovie(movieName); // Update selected movie
    setSelectedScreen(screenName); // Update selected screen

    let filtered = schedules;

    if (movieName) {
      filtered = filtered.filter(
        (schedule) => schedule.movieName === movieName
      );
    }

    if (screenName) {
      filtered = filtered.filter(
        (schedule) => schedule.screenName === screenName
      );
    }

    setFilteredSchedules(filtered);
  };

  useEffect(() => {
    fetchSchedules();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">All Movie Schedules</h2>

      {/* Filter Section */}
      {/* By Movie */}
      <div className="mb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <label
          htmlFor="movieFilter"
          className="block mb-2 text-sm font-medium text-gray-600"
        >
          Filter by Movie Name
        </label>
        <select
          id="movieFilter"
          value={selectedMovie}
          onChange={(e) => handleFilterChange(e.target.value)}
          className="p-2 border border-gray-300 rounded-md sm:w-64"
        >
          <option value="">All Movies</option>
          {movieNames.map((movie, index) => (
            <option key={index} value={movie}>
              {movie}
            </option>
          ))}
        </select>
      </div>
      {/* By Cinema */}
      <div className="mb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <label
          htmlFor="screenFilter"
          className="block mb-2 text-sm font-medium text-gray-600"
        >
          Filter by Screen Name
        </label>
        <select
          id="screenFilter"
          value={selectedScreen}
          onChange={(e) => handleFilterChange(selectedMovie, e.target.value)}
          className="p-2 border border-gray-300 rounded-md sm:w-64"
        >
          <option value="">All Screens</option>
          {screenNames.map((screen, index) => (
            <option key={index} value={screen}>
              {screen}
            </option>
          ))}
        </select>
      </div>

      {/* Schedules Table */}
      {filteredSchedules.length > 0 ? (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th className="px-6 py-3">No.</th>
                <th className="px-6 py-3">Movie Name</th>
                <th className="px-6 py-3">Show Date</th>
                <th className="px-6 py-3">Show Time</th>
                <th className="px-6 py-3">Unavailable Seats</th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody>
              {filteredSchedules.map((schedule, index) => (
                <tr
                  key={index}
                  className={`${
                    index % 2 === 0 ? "bg-gray-50" : "bg-white"
                  } border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-blue-100 dark:hover:bg-gray-700`}
                >
                  <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">
                    {index + 1}
                  </td>
                  <td className="px-6 py-4 font-semibold text-blue-600 dark:text-blue-400">
                    {schedule.movieName} - {schedule.screenName}
                  </td>
                  <td className="px-6 py-4 text-green-600 dark:text-green-400">
                    {new Date(schedule.showDate).toLocaleDateString("en-US", {
                      weekday: "long",
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </td>
                  <td className="px-6 py-4 text-purple-600 dark:text-purple-400">
                    {schedule.showTime}
                  </td>
                  <td className="px-6 py-4">
                    {schedule.notAvailableSeats.length > 0 ? (
                      <ul className="list-disc pl-4">
                        {schedule.notAvailableSeats.map((seat, seatIndex) => (
                          <li
                            key={seatIndex}
                            className="text-red-500 dark:text-red-400"
                          >
                            Seat: {seat.seat_id}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <span className="text-green-400 italic">
                        All seats available
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="mt-4 text-gray-500 text-center">
          No schedules to display.
        </p>
      )}
    </div>
  );
};

export default ListSchedule;
