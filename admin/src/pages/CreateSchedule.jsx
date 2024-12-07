import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";

import image from "../assets/rating.png";

const CreateSchedule = () => {
  const [schedule, setSchedule] = useState({
    screenId: "",
    movieId: "",
    showTime: "",
    showDate: "",
  });

  const [city, setCity] = useState("");
  const [screens, setScreens] = useState([]);
  const [movies, setMovies] = useState([]);

  const getMovies = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/movie/movies");

      if (!response.ok) {
        throw new Error("Failed to fetch movies");
      }
      const data = await response.json();
      setMovies(data.data);

      console.log(data.data);
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };

  useEffect(() => {
    getMovies();
  }, []);

  const getScreensByCity = async () => {
    if (city === "") return toast.error("Please select a city");

    const response = await fetch(
      `http://localhost:8080/api/movie/screensbycity/${city.toLowerCase()}`
    );

    const data = await response.json();
    setScreens(data.data);

    console.log(data.data);
  };

  const adminToken = localStorage.getItem("token");

  const createSchedule = async () => {
    if (
      !schedule.screenId ||
      !schedule.movieId ||
      !schedule.showTime ||
      !schedule.showDate
    ) {
      toast.error("Please fill all the fields");
      return;
    }

    const response = await fetch(
      "http://localhost:8080/api/movie/addmoviescheduletoscreen",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${adminToken}`,
        },
        credentials: "include",
        body: JSON.stringify(schedule),
      }
    );

    const data = await response.json();

    console.log(data);
    if (data.ok) {
      toast.success("Schedule created successfully");
    } else {
      toast.error("Schedule creation failed");
    }
  };

  return (
    <div className="p-4">
      <div className="mb-4 flex flex-col sm:flex-row sm:items-center sm:space-x-4">
        {/* City Search Section */}
        <input
          type="text"
          name="city"
          id="city"
          placeholder="City"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="p-2 border border-gray-300 rounded-md w-full sm:w-64"
        />
        <button
          onClick={() => getScreensByCity()}
          className="mt-2 sm:mt-0 bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition w-full sm:w-auto"
        >
          Search
        </button>
      </div>

      {/* Screens List Section */}
      <div className="mb-4">
        <h1 className="text-xl font-semibold mb-2">Screens</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {screens?.map((screen, index) => (
            <div
              className={`${
                schedule.screenId === screen._id ? "bg-blue-100" : "bg-white"
              } p-4 border rounded-md cursor-pointer`}
              key={index}
              onClick={() => {
                setSchedule({ ...schedule, screenId: screen._id });
              }}
            >
              <p className="font-semibold text-lg text-gray-800 mb-2">
                Name: <span className="text-blue-600">{screen.name}</span>
              </p>
              <p className="text-gray-600 mb-2">
                <span className="font-medium">Location:</span> {screen.location}
              </p>
              <p className="text-gray-600 mb-2">
                {" "}
                <span className="font-medium">City:</span> {screen.city}
              </p>

              <div className="text-gray-600">
                <span className="font-medium">Type:</span>{" "}
                <span
                  className={`inline-block ${
                    screen.screenType === "IMAX"
                      ? "bg-yellow-200 text-yellow-800"
                      : screen.screenType === "3D"
                      ? "bg-green-200 text-green-800"
                      : screen.screenType === "2D"
                      ? "bg-gray-200 text-gray-800"
                      : "bg-blue-200 text-white"
                  } px-2 py-1 rounded-full text-sm font-medium`}
                >
                  {screen.screenType}
                </span>
              </div>

            </div>
          ))}
        </div>
      </div>

      {/* Movies List Section */}
      <div className="mb-4">
        <h1 className="text-xl font-semibold mb-2">Movies</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {movies?.map((movie, index) => (
            <div
              className={`${
                schedule.movieId === movie._id ? "bg-blue-100" : "bg-white"
              } p-4 mb-2 border rounded-md cursor-pointer`}
              key={index}
              onClick={() => {
                setSchedule({ ...schedule, movieId: movie._id });
              }}
            >
              <p className="font-semibold text-lg text-gray-800 mb-2">
                Name: <span className="text-blue-600">{movie.title}</span>
              </p>
              <p className="text-gray-600 mb-2">
                <span className="font-medium">Descript:</span>{" "}
                {movie.description}
              </p>
              <p className="text-gray-600 mb-2 flex gap-2">
                <span className="font-medium">Rating:</span> {movie.rating}
                <img src={image} alt="" className="w-3 h-3" />
              </p>

              <div className="text-gray-600 mb-2">
                <span className="font-medium">Genre:</span>{" "}
                {movie.genre.map((g, i) => (
                  <span
                    key={i}
                    className="inline-block bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-sm mr-2"
                  >
                    {g}
                  </span>
                ))}
              </div>
              <p className="text-gray-600">
                <span className="font-medium">Duration:</span> {movie.duration}{" "}
                mins
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Show Time and Show Date */}
      <div className="mb-4">
        <div className="flex flex-col sm:flex-row sm:space-x-4">
          <input
            type="time"
            name="showTime"
            id="showTime"
            onChange={(e) =>
              setSchedule({ ...schedule, showTime: e.target.value })
            }
            className="p-2 border border-gray-300 rounded-md w-full sm:w-64 mb-4 sm:mb-0"
          />

          <input
            type="date"
            name="showDate"
            id="showDate"
            onChange={(e) =>
              setSchedule({ ...schedule, showDate: e.target.value })
            }
            className="p-2 border border-gray-300 rounded-md w-full sm:w-64"
          />
        </div>
      </div>

      {/* Save Button */}
      <button
        onClick={() => {
          createSchedule();
        }}
        className="bg-green-500 text-white p-2 rounded-md w-full sm:w-64 hover:bg-green-600 transition"
      >
        Save
      </button>
    </div>
  );
};

export default CreateSchedule;
