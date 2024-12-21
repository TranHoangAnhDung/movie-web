import React, { useState, useEffect } from "react";
import { useParams, useLocation, useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import Payment from "./Payment";

const SelectSeat = () => {
  const { movieid, city, screenid } = useParams();
  const location = useLocation();
  // const navigate = useNavigate();

  // Extract query params (e.g., ?date=...)
  const searchParams = new URLSearchParams(location.search);
  const date = searchParams.get("date");

  const [screen, setScreen] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [movie, setMovie] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState([]);

  const getSchedules = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/movie/schedulebymovie/${screenid}/${date}/${movieid}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      if (data.ok) {
        // console.log("Fetched screen data:", data.data);
        setScreen(data.data);
        setSelectedTime(data.data.movieSchedulesforDate[0]);
      } else {
        console.error(data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const getMovie = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/movie/movies/${movieid}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      if (data.ok) {
        console.log("movie", data.data);
        setMovie(data.data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getSchedules();
    getMovie();
  }, []);

  const selectDeselectSeat = (seat) => {
    const isSelected = selectedSeats.find(
      (s) =>
        s.row === seat.row && s.col === seat.col && s.seat_id === seat.seat_id
    );

    if (isSelected) {
      setSelectedSeats(
        selectedSeats.filter(
          (s) =>
            s.row !== seat.row ||
            s.col !== seat.col ||
            s.seat_id !== seat.seat_id
        )
      );
    } else {
      setSelectedSeats([...selectedSeats, seat]);
    }
  };

  const generateSeatLayout = () => {
    if (!screen || !screen.movieSchedulesforDate || !selectedTime) return null;

    const selectedScheduleIndex = screen.movieSchedulesforDate.findIndex(
      (t) => t.showTime === selectedTime.showTime
    );

    const notAvailableSeats =
      screen.movieSchedulesforDate[selectedScheduleIndex].notAvailableSeats;

    return (
      <div>
        {screen.screen.seats.map((seatType, index) => (
          <div className="bg-white p-4 m-4" key={index}>
            <h2 className="text-base font-normal mb-2 border border-gray-300 px-5 py-2 rounded-full">
              {seatType.type} - ${seatType.price}
            </h2>

            <div>
              {/* ROW */}
              {seatType.rows.map((row, rowIndex) => (
                <div className="flex gap-5 items-center mb-4" key={rowIndex}>
                  <p className="w-max-content font-semibold text-sm bg-red-500 text-white w-7 h-7 flex justify-center items-center rounded-full leading-none">
                    {row.rowname}
                  </p>

                  {/* COLUMN */}
                  <div className="flex gap-12 w-full">
                    {row.cols.map((col, colIndex) => (
                      <div className="flex" key={colIndex}>
                        {col.seats.map((seat, seatIndex) => {
                          // For the Right Column, adjust the seat numbering
                          const adjustedSeatIndex =
                            colIndex === 1 ? seatIndex + 6 : seatIndex; // Start from B7 for Right Column
                          return (
                            <div key={seatIndex}>
                              {/* SEAT ALREADY BOOKED */}
                              {notAvailableSeats.find(
                                (s) =>
                                  s.row === row.rowname &&
                                  s.seat_id === seat.seat_id &&
                                  s.col === colIndex
                              ) ? (
                                <span className="text-gray-400 bg-gray-300 cursor-not-allowed w-8 h-8 flex justify-center items-center mr-3 rounded-lg shadow-md">
                                  {row.rowname}
                                  {adjustedSeatIndex + 1}
                                </span>
                              ) : (
                                <span
                                  className={`${
                                    selectedSeats.find(
                                      (s) =>
                                        s.row === row.rowname &&
                                        s.seat_id === seat.seat_id &&
                                        s.col === colIndex
                                    )
                                      ? "bg-red-500 text-white border-2 border-red-600"
                                      : "bg-green-400 text-black cursor-pointer border-1 border-primary"
                                  } w-9 h-9 flex justify-center items-center mr-3 rounded-lg shadow-sm`}
                                  onClick={() =>
                                    selectDeselectSeat({
                                      row: row.rowname,
                                      col: colIndex,
                                      seat_id: seat.seat_id,
                                      price: seatType.price,
                                    })
                                  }
                                >
                                  {row.rowname}
                                  {adjustedSeatIndex + 1}
                                </span>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    ))}
                  </div>
                  <br />
                  <br />
                  <br />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  };

  // const handleBooking = async () => {
  //   // console.log("Selected screen ID:", screen.id);

  //   // Prepare selected seats data (seat names like B5, B6, etc.)
  //   const seatNames = selectedSeats.map((seat) => {
  //     const row = seat.row; // Row like 'A', 'B', etc.
  //     const seatNumber = seat.seat_id.slice(1); // Seat number like 1, 2, 3...
  //     return `${row}${seatNumber}`; // Format like B5, A1, etc.
  //   });

  //   // Calculate the total price
  //   const totalPrice = selectedSeats.reduce((acc, seat) => acc + seat.price, 0);

  //   navigate("/payment", {
  //     state: {
  //       selectedSeats: seatNames,
  //       seatDetails: selectedSeats,
  //       movieTitle: movie.title,
  //       screenName: screen.screen.name,
  //       totalPrice: totalPrice,
  //       selectedTime,
  //       date,
  //       movie,
  //       screen,
  //     },
  //   });
  //   // try {
  //   //   const response = await fetch(
  //   //     "http://localhost:8080/api/movie/bookticket",
  //   //     {
  //   //       method: "POST",
  //   //       headers: {
  //   //         "Content-Type": "application/json",
  //   //         Authorization: `Bearer ${localStorage.getItem("token")}`,
  //   //       },
  //   //       body: JSON.stringify({
  //   //         showTime: selectedTime.showTime,
  //   //         showDate: date,
  //   //         movieId: movieid,
  //   //         screenId: screenid,
  //   //         seats: selectedSeats,
  //   //         totalPrice: selectedSeats.reduce(
  //   //           (acc, seat) => acc + seat.price,
  //   //           0
  //   //         ),
  //   //         // paymentId: "123456789",
  //   //         // paymentType: "online",
  //   //       }),
  //   //     }
  //   //   );
  //   //   const data = await response.json();
  //   //   if (data.ok) {
  //   //     toast.success("Booking Successful");
  //   //     console.log(data);
  //   //   } else {
  //   //     console.error(data);
  //   //   }
  //   // } catch (err) {
  //   //   console.error(err);
  //   // }
  // };

  const handleBooking = async () => {
    try {
      const response = await fetch(
        "http://localhost:8080/api/movie/bookticket",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            showTime: selectedTime.showTime,
            showDate: date,
            movieId: movieid,
            screenId: screenid,
            seats: selectedSeats,
            totalPrice: selectedSeats.reduce(
              (acc, seat) => acc + seat.price,
              0
            ),
            // paymentId: "123456789",
            // paymentType: "online",
          }),
        }
      );
      const data = await response.json();
      if (data.ok) {
        toast.success("Booking Successful");
        console.log("Booking Details:", data.data);

        const { movieTitle, screenName, userName } = data.data;
        console.log(
          `Booked Movie: ${movieTitle}, Screen: ${screenName}, User: ${userName}`
        );

      } else {
        toast.error(data.message || "Booking failed");
        console.error(data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="bg-gray-200 min-h-screen w-full">
      {movie && screen && (
        <div className="bg-white">
          <div className="bg-col2 p-4">
            <h1 className="text-white text-2xl font-semibold">
              {movie.title} - {screen?.screen?.name}
            </h1>
            <h3 className="text-gray-600 text-sm font-semibold border border-gray-400 py-1 px-5 rounded-full w-max-content">
              {movie.genre.join(" / ")}
            </h3>
          </div>
        </div>
      )}

      {screen && (
        <div className="flex flex-col items-center bg-white">
          <div className="flex justify-center items-center gap-2 my-5">
            {screen.movieSchedulesforDate.map((time, index) => (
              <h3
                className={`${
                  selectedTime?._id === time._id
                    ? "border-2 border-green-400 text-green-400"
                    : "border-2 border-gray-300 text-gray-800"
                } px-5 py-2 rounded-full text-sm font-normal cursor-pointer`}
                onClick={() => {
                  setSelectedTime(time);
                  setSelectedSeats([]);
                }}
                key={index}
              >
                {time.showTime}
              </h3>
            ))}
          </div>
          <div className="flex items-center justify-center gap-5 my-5">
            <div className="flex items-center gap-2">
              <span className="bg-gray-300 w-5 h-5 rounded-full flex justify-center items-center text-xs font-semibold text-white"></span>
              <p className="text-gray-600 text-sm font-semibold">
                Not available
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="bg-green-400 w-5 h-5 rounded-full flex justify-center items-center text-xs font-semibold text-white"></span>
              <p className="text-gray-600 text-sm font-semibold">Available</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="bg-red-500 w-5 h-5 rounded-full flex justify-center items-center text-xs font-semibold text-white"></span>
              <p className="text-gray-600 text-sm font-semibold">Selected</p>
            </div>
          </div>

          {generateSeatLayout()}

          {/* SCREEN ICON */}
          <div className="flex justify-center items-center my-14">
            <div className="relative w-96 h-18 bg-gradient-to-t from-gray-800 to-transparent rounded-b-full text-white text-center font-bold text-sm flex justify-center items-center">
              SCREEN
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-4/5 h-1 bg-white"></div>
            </div>
          </div>

          {/* BOOK TICKET */}
          <div className="flex items-center justify-between bg-white p-5 my-5 rounded-xl shadow-sm w-[300px]">
            <div className="flex items-center gap-4">
              <h2 className="text-sm font-semibold text-gray-600">Total</h2>
              <h3 className="text-sm font-semibold text-primary">
                $ {selectedSeats.reduce((acc, seat) => acc + seat.price, 0)}
              </h3>
            </div>

            <button
              className="px-5 py-2 bg-red-500 text-black rounded-lg hover:bg-red-400"
              onClick={handleBooking}
            >
              Book Now
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SelectSeat;
