import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios"

import Title from "../components/Title";
import image1 from "../assets/stripe_logo.png";
import image2 from "../assets/razorpay_logo.png";

const Payment = () => {
  const location = useLocation();

  const { selectedSeats, movie, screen, selectedTime, date, totalPrice } =
    location.state || {};

  const navigate = useNavigate();

  const [user, setUser] = useState({
    name: "",
    email: "",
    city: "",
  });

  const seatNames = selectedSeats.map((seat) => {
    const row = seat.row; // Row like 'A', 'B', etc.
    const seatNumber = seat.seat_id.slice(1); // Extract seat number
    return `${row}${seatNumber}`; // Format like B5, A1, etc.
  });

  const handlePayNow = async () => {
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
            movieId: movie._id,
            screenId: screen.screen._id,
            seats: selectedSeats,
            totalPrice,
          }),
        }
      );

      const data = await response.json();
      if (data.ok) {
        toast.success("Payment successful! Booking confirmed.");
        // Redirect to a confirmation or home page
        navigate("/", { state: data.data });
      } else {
        toast.error(data.message || "Payment failed.");
      }
    } catch (err) {
      console.error(err);
      toast.error("Payment failed. Please try again.");
    }
  };

  const getUser = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/auth/getuser", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (response.data.ok) {
        setUser(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };

  useEffect(() => {
    getUser()
  }, [])

  return (
    <div className="container mx-auto px-8 py-8">
      <div className="flex flex-col lg:flex-row justify-between gap-8 lg:gap-12 border-t pt-8 lg:pt-14">
        {/* Left side - Customer Information */}
        <div className="flex flex-col gap-6 w-full lg:w-1/2">
          <div className="text-xl sm:text-2xl mb-4">
            <Title text1="CUSTOMER" text2=" INFORMATION" />
          </div>
          <form className="flex flex-col gap-4">
            <input
              type="text"
              value={user.name}
              readOnly
              placeholder="Name"
              className="border border-gray-300 rounded-lg py-2 px-4 w-full sm:w-auto focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />

            <input
              type="email"
              value={user.email}
              readOnly
              placeholder="Email address"
              className="border border-gray-300 rounded-lg py-2 px-4 w-full focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            <input
              type="text"
              placeholder="City"
              value={user.city}
            readOnly
              className="border border-gray-300 rounded-lg py-2 px-4 w-full focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </form>
        </div>

        {/* Right side - Booking Details and Payment Method */}
        <div className="w-full lg:w-1/2">
          {/* Booking Details */}
          <div className="mb-8">
            <div className="text-xl sm:text-2xl mb-4">
              <Title text1="BOOKING" text2=" DETAILS" />
            </div>
            <ul className="bg-black p-6 space-y-2">
              <li className="text-white">
                <strong className="text-yellow-500 pr-9">Movie:</strong>{" "}
                {movie?.title}
              </li>
              <li className="text-white">
                <strong className="text-yellow-500 pr-7">Cinema:</strong>{" "}
                {screen?.screen?.name}
              </li>
              <li className="text-white">
                <strong className="text-yellow-500 pr-9">Showtime:</strong>{" "}
                {selectedTime?.showTime}
              </li>
              <li className="text-white">
                <strong className="text-yellow-500 pr-10">Date:</strong>{" "}
                {new Date(date).toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </li>
              <li className="text-white">
                <strong className="text-yellow-500 pr-9">Seats:</strong>{" "}
                {seatNames.join(", ")}
              </li>
              <li className="text-white">
                <strong className="text-yellow-500 pr-9">Total Price:</strong> $
                {totalPrice}
              </li>
            </ul>
          </div>

          {/* Pay Now Button */}
          <div className="w-full text-start">
            <button
              className="bg-blue-600 text-white rounded-lg px-8 py-3 text-sm hover:bg-blue-700 transition-all"
              onClick={handlePayNow}
            >
              PAY NOW
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
