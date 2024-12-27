import React, { useEffect, useState } from "react";
import { useLocation, useParams, Link } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

// import DatePicker from "react-horizontal-datepicker";

const BuyTickets = () => {
  const { movieid, city } = useParams(); // Get params using React Router

  const location = useLocation(); // Get the current pathname

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [movie, setMovie] = useState(null);
  const [theatres, setTheatres] = useState(null);
  const [availableDates, setAvailableDates] = useState([]);

  const getAvailableDates = async () => {
    try {
      const res = await fetch(
        `http://localhost:8080/api/movie/getavailabledates/${city}/${movieid}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await res.json();
      if (data.ok) {
        setAvailableDates(data.data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const getMovie = async () => {
    try {
      const res = await fetch(
        `http://localhost:8080/api/movie/movies/${movieid}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await res.json();
      if (data.ok) {
        console.log(data);
        setMovie(data.data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const getTheatres = async (date) => {
    const movieId = movieid;
    const cityname = city;

    try {
      const res = await fetch(
        `http://localhost:8080/api/movie/screensbymovieschedule/${cityname}/${date}/${movieId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await res.json();

      if (data.ok) {
        console.log(data);
        setTheatres(data.data);
      } else {
        console.error(data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Get movie details when the component mounts
  useEffect(() => {
    getMovie();
    getAvailableDates();
  }, []);

  // Get theaters when the selected date changes
  useEffect(() => {
    getTheatres(selectedDate);
  }, [selectedDate]);

  return (
    <>
      {movie && (
        <div className="bg-gray-200 min-h-screen w-full">
          <div className="bg-yellow">
            <div className="bg-[var(--col2)] p-5">
              <h1 className="text-white text-4xl font-semibold">
                {movie.title}
              </h1>
              <h3 className="text-gray-500 text-sm font-semibold border border-gray-500 px-5 py-1 rounded-full w-fit">
                {movie.genre.join(", ")}
              </h3>
            </div>

            {/* SHOW DATE */}
            <div className="flex justify-center space-x-4 my-5">
              {availableDates.map((date, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedDate(date)}
                  className={`py-2 px-4 rounded-full transition-all duration-300 ${
                    selectedDate === date
                      ? "bg-red-500 text-white"
                      : "bg-white text-black"
                  }`}
                >
                  {new Date(date).toLocaleDateString("en-US", {
                    weekday:"long",
                    month: "short",
                    day: "numeric",
                    year:"numeric"
                  })}
                </button>
              ))}
            </div>
          </div>

          {theatres && theatres.length > 0 && (
            <div className="w-11/12 mx-auto my-5 shadow-lg bg-white p-5 rounded-lg">
              {theatres.map((screen, index) => {
                return (
                  <div
                    className="flex justify-between items-center my-2 py-2 border-b border-gray-200 last:border-none cursor-pointer transition-all duration-300"
                    key={screen._id}
                  >
                    <div>
                      <h2 className="text-lg font-semibold">
                        {screen.name} - {screen.screenType}
                      </h2>
                      <h3 className="text-sm font-semibold">
                        {screen.location}
                      </h3>
                    </div>
                    
                    <div>
                      <Link
                        to={`${location.pathname}/${screen._id}?date=${selectedDate}`}
                        className="bg-red-500 text-white px-4 py-2 rounded"
                      >
                        Select
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
          {/* {theatres && theatres.length > 0 && (
            <div className="w-11/12 mx-auto my-5 shadow-lg bg-white p-5 rounded-lg">
              {theatres.map((screen, index) => {
                const screenid = screen._id;
                return (
                  <div
                    className="flex justify-between items-center my-2 py-2 border-b border-gray-200 last:border-none cursor-pointer transition-all duration-300"
                    key={index}
                  >
                    <div>
                      <h2 className="text-lg font-semibold">
                        {screen.name} - {screen.screenType}
                      </h2>
                      <h3 className="text-sm font-semibold">
                        {screen.location}
                      </h3>
                    </div>
                    <Link
                      to={`${location.pathname}/${screenid}?date=${selectedDate}`}
                      className="bg-red-500 text-white px-4 py-2 rounded"
                    >
                      Select
                    </Link>
                  </div>
                );
              })}
            </div>
          )} */}
        </div>
      )}
    </>
  );
};

export default BuyTickets;
