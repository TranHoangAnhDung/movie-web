import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import Title from "../components/Title";
import image1 from "../assets/stripe_logo.png";
import image2 from "../assets/razorpay_logo.png";

const Payment = () => {
  
  const location = useLocation();
  
  const { selectedSeats, movie, screen, selectedTime, date, totalPrice } =
    location.state || {};

  const navigate = useNavigate()

  const [method, setMethod] = useState("stripe");

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

  // const handleBookTickets = async () => {
  //   try {
  //     const response = await fetch(
  //       "http://localhost:8080/api/movie/bookticket",
  //       {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //           Authorization: `Bearer ${localStorage.getItem("token")}`,
  //         },
  //         body: JSON.stringify({
  //           showTime: selectedTime.showTime,
  //           showDate: date,
  //           movieId: movie.id,
  //           screenId: screen.screen._id,
  //           seats: seatDetails, // Pass the full seat details (row, seat_id, price, etc.)
  //           totalPrice: totalPrice,
  //           // showTime: selectedTime.showTime,
  //           // showDate: date,
  //           // movieId: movie.id,
  //           // screenId: screen.id,
  //           // seats: selectedSeats,
  //           // totalPrice: selectedSeats.reduce(
  //           //   (acc, seat) => acc + seat.price,
  //           //   0
  //           // ),
  //         }),
  //       }
  //     );
  //     const data = await response.json();
  //     if (data.ok) {
  //       toast.success("Booking successful!");
  //     } else {
  //       console.error(data);
  //       toast.error(data.message);
  //     }
  //   } catch (err) {
  //     console.error(err);
  //     toast.error("Payment failed. Please try again.");
  //   }
  // };

  return (
    <div className="flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80px] border-t">
      {/* Left side */}
      <div className="flex flex-col gap-4 w-full sm:max-w-[480px]">
        <div className="text-xl sm:text-2xl my-3">
          <Title text1={"CUSTOMER"} text2={" INFORMATION"} />
        </div>
        <div className="flex gap-3">
          <input
            type="text"
            placeholder="First name"
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          />
          <input
            type="text"
            placeholder="Last name"
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          />
        </div>
        <input
          type="email"
          placeholder="Email address"
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
        />
      </div>

      {/* Right side */}
      <div className="mt-8">
        <div className="mt-8 min-w-80 text-white">
          <h2>Booking Details</h2>
          <div className="text-white">
            <p>
              <strong>Movie:</strong> {movie?.title}
            </p>
            <p>
              <strong>Screen:</strong> {screen?.screen?.name}
            </p>
            <p><strong>Showtime:</strong> {selectedTime?.showTime}</p>
            <p><strong>Date:</strong> {date}</p>

            <p>
          <strong>Seats:</strong>{" "}
          {selectedSeats.map((seat) => `${seat.row}${seat.col + 1}`).join(", ")}
        </p>

            <p>
              <strong>Total Price:</strong> ${totalPrice}
            </p>
          </div>
        </div>

        <div className="mt-12">
          <Title text1={"PAYMENT"} text2={" METHOD"} />
          <div className="flex gap-3 flex-col lg:flex-row">
            <div
              onClick={() => setMethod("stripe")}
              className="flex items-center gap-3 border p-2 px-3 cursor-pointer"
            >
              <p
                className={`min-w-3.5 h-3.5 border rounded-full ${
                  method === "stripe" ? "bg-green-400" : ""
                }`}
              ></p>
              <img src={image1} alt="" className="h-5 mx-4" />
            </div>
            <div
              onClick={() => setMethod("razorpay")}
              className="flex items-center gap-3 border p-2 px-3 cursor-pointer"
            >
              <p
                className={`min-w-3.5 h-3.5 border rounded-full ${
                  method === "razorpay" ? "bg-green-400" : ""
                }`}
              ></p>
              <img src={image2} alt="" className="h-5 mx-4" />
            </div>
          </div>

          <div className="w-full text-end mt-8">
            <button
              className="bg-black text-white px-16 py-3 text-sm"
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
