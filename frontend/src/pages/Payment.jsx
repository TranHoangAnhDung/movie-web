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

  const navigate = useNavigate();

  const [method, setMethod] = useState("stripe");

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

  return (
//     <div className="flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80px] border-t">
//   {/* Left side */}
//   <div className="flex flex-col gap-4 w-full sm:max-w-[480px]">
//     <div className="text-xl sm:text-2xl my-3">
//       <Title text1={"CUSTOMER"} text2={" INFORMATION"} />
//     </div>
//     <div className="flex flex-col sm:flex-row gap-4">
//       <input
//         type="text"
//         placeholder="First name"
//         className="border border-gray-300 rounded py-1.5 px-3.5 w-full sm:w-auto"
//       />
//       <input
//         type="text"
//         placeholder="Last name"
//         className="border border-gray-300 rounded py-1.5 px-3.5 w-full sm:w-auto"
//       />
//     </div>
//     <input
//       type="email"
//       placeholder="Email address"
//       className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
//     />
//   </div>

//   {/* Right side */}
//   <div className="mt-8 sm:mt-0 sm:max-w-[480px]">
//     <div className="mt-8 min-w-80 text-white">
//       <h2>Booking Details</h2>
//       <div className="text-white">
//         <p>
//           <strong>Movie:</strong> {movie?.title}
//         </p>
//         <p>
//           <strong>Cinema:</strong> {screen?.screen?.name}
//         </p>
//         <p>
//           <strong>Showtime:</strong> {selectedTime?.showTime}
//         </p>
//         <p>
//           <strong>Date:</strong> {date}
//         </p>
//         <p>
//           <strong>Seats:</strong> {seatNames.join(", ")}
//         </p>
//         <p>
//           <strong>Total Price:</strong> ${totalPrice}
//         </p>
//       </div>
//     </div>

    // <div className="mt-12">
    //   <Title text1={"PAYMENT"} text2={" METHOD"} />
    //   <div className="flex flex-col lg:flex-row gap-4">
    //     <div
    //       onClick={() => setMethod("stripe")}
    //       className="flex items-center gap-3 border p-2 px-3 cursor-pointer"
    //     >
    //       <p
    //         className={`min-w-3.5 h-3.5 border rounded-full ${
    //           method === "stripe" ? "bg-green-400" : ""
    //         }`}
    //       ></p>
    //       <img src={image1} alt="Stripe" className="h-5 mx-4" />
    //     </div>
    //     <div
    //       onClick={() => setMethod("razorpay")}
    //       className="flex items-center gap-3 border p-2 px-3 cursor-pointer"
    //     >
    //       <p
    //         className={`min-w-3.5 h-3.5 border rounded-full ${
    //           method === "razorpay" ? "bg-green-400" : ""
    //         }`}
    //       ></p>
    //       <img src={image2} alt="Razorpay" className="h-5 mx-4" />
    //     </div>
    //   </div>

    //   <div className="w-full text-end mt-8">
    //     <button
    //       className="bg-black text-white px-16 py-3 text-sm"
    //       onClick={handlePayNow}
    //     >
    //       PAY NOW
    //     </button>
    //   </div>
//     </div>
//   </div>
// </div>
<div className="container mx-auto px-8 py-8">
  <div className="flex flex-col lg:flex-row justify-between gap-8 lg:gap-12 border-t pt-8 lg:pt-14">
    {/* Left side - Customer Information */}
    <div className="flex flex-col gap-6 w-full lg:w-1/2">
      <div className="text-xl sm:text-2xl mb-4">
        <Title text1="CUSTOMER" text2=" INFORMATION" />
      </div>
      <form className="flex flex-col gap-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <input
            type="text"
            placeholder="First name"
            className="border border-gray-300 rounded-lg py-2 px-4 w-full sm:w-auto focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
          <input
            type="text"
            placeholder="Last name"
            className="border border-gray-300 rounded-lg py-2 px-4 w-full sm:w-auto focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>
        <input
          type="email"
          placeholder="Email address"
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
            <strong className="text-yellow-500 pr-9">Movie:</strong> {movie?.title}
          </li>
          <li className="text-white">
            <strong className="text-yellow-500 pr-7">Cinema:</strong> {screen?.screen?.name}
          </li>
          <li className="text-white">
            <strong className="text-yellow-500 pr-9">Showtime:</strong> {selectedTime?.showTime}
          </li>
          <li className="text-white">
            <strong className="text-yellow-500 pr-10">Date:</strong> {date}
          </li>
          <li className="text-white">
            <strong className="text-yellow-500 pr-9">Seats:</strong> {seatNames.join(", ")}
          </li>
          <li className="text-white">
            <strong className="text-yellow-500 pr-9">Total Price:</strong> ${totalPrice}
          </li>
        </ul>
      </div>

      {/* Payment Method */}
      <div className="mb-8">
        <div className="text-xl sm:text-2xl mb-4">
          <Title text1="PAYMENT" text2=" METHOD" />
        </div>
        <div className="flex flex-col lg:flex-row gap-4">
          <div
            onClick={() => setMethod("stripe")}
            className={`flex items-center gap-3 border p-3 rounded-lg cursor-pointer ${
              method === "stripe" ? "border-blue-500 bg-blue-50" : "border-gray-300"
            }`}
          >
            <div
              className={`w-4 h-4 border rounded-full ${
                method === "stripe" ? "bg-green-400" : ""
              }`}
            ></div>
            <img src={image1} alt="Stripe" className="h-6" />
          </div>
          <div
            onClick={() => setMethod("razorpay")}
            className={`flex items-center gap-3 border p-3 rounded-lg cursor-pointer ${
              method === "razorpay" ? "border-blue-500 bg-blue-50" : "border-gray-300"
            }`}
          >
            <div
              className={`w-4 h-4 border rounded-full ${
                method === "razorpay" ? "bg-green-400" : ""
              }`}
            ></div>
            <img src={image2} alt="Razorpay" className="h-6" />
          </div>
        </div>
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
