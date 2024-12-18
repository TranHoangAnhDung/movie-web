import React, { useState, useEffect } from "react";

const MyProfile = () => {
  const [bookings, setBookings] = useState(null);
  const [user, setUser] = useState(null);

  const getBookings = async () => {
    try {
      const response = await fetch(
        "http://localhost:8080/api/movie/getuserbookings",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const data = await response.json();
      if (data.ok) {
        console.log(data);
        setBookings(data.data);
      } else {
        console.error(data);
      }
    } catch (error) {
      console.error("Error fetching bookings:", error);
    }
  };

  const getUserData = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/auth/getuser", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = await response.json();
      if (data.ok) {
        console.log(data);
        setUser(data.data);
      } else {
        console.error(data);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    getBookings();
    getUserData();
  }, []);

  return (
    <div className="max-w-2xl mx-auto p-5 flex flex-col gap-5 items-center">
      <h1 className="text-center w-full text-col1 font-normal">Profile</h1>
      <div className="mt-5 w-full flex flex-col items-center justify-center">
        <h2 className="text-xl font-semibold">User Details</h2>
        <div className="flex flex-wrap gap-2.5 w-full justify-center">
          <div className="flex-1 m-2.5 p-2.5 border border-gray-300 rounded">
            <h3 className="m-0 text-red-100 font-normal">Name</h3>
            <p className="m-0">{user?.name}</p>
          </div>
          <div className="flex-1 m-2.5 p-2.5 border border-gray-300 rounded">
            <h3 className="m-0 text-red-100 font-normal">Email</h3>
            <p className="m-0">{user?.email}</p>
          </div>
          <div className="flex-1 m-2.5 p-2.5 border border-gray-300 rounded">
            <h3 className="m-0 text-red-100 font-normal">City</h3>
            <p className="m-0">{user?.city}</p>
          </div>
        </div>
      </div>
      <div className="mt-5 w-full flex flex-col items-center justify-center">
        <h2 className="text-xl font-semibold">Bookings</h2>
        <div className="flex flex-wrap gap-2.5 w-full justify-center">
          {/* BOOKING CARD */}
          {bookings?.map((booking) => (
            <div className="my-5 border border-gray-300 rounded p-4" key={booking._id}>
              <div className="flex items-center mb-2.5">
                <h3 className="mr-2.5 text-red-100 font-normal">Movie</h3>
                <p className="m-0">{booking.movieId.title}</p>
              </div>
              <div className="flex items-center mb-2.5">
                <h3 className="mr-2.5 text-red-100 font-normal">Screen</h3>
                <p className="m-0">{booking.screenId.name}</p>
              </div>
              <div className="flex items-center mb-2.5">
                <h3 className="mr-2.5 text-red-100 font-normal">Seats</h3>
                <p className="m-0">
                  {booking.seats.map((seat, index) => (
                    <span key={index}> {seat.seat_id} </span>
                  ))}
                </p>
              </div>
              <div className="flex items-center mb-2.5">
                <h3 className="mr-2.5 text-red-100 font-normal">Price</h3>
                <p className="m-0">{booking.totalPrice}</p>
              </div>
              <div className="flex items-center mb-2.5">
                <h3 className="mr-2.5 text-red-100 font-normal">Payment Type</h3>
                <p className="m-0">{booking.paymentType}</p>
              </div>
              <div className="flex items-center mb-2.5">
                <h3 className="mr-2.5 text-red-100 font-normal">Payment Id</h3>
                <p className="m-0">{booking.paymentId}</p>
              </div>
              <div className="flex items-center mb-2.5">
                <h3 className="mr-2.5 text-red-100 font-normal">Show Date</h3>
                <p className="m-0">{booking.showDate}</p>
              </div>
              <div className="flex items-center mb-2.5">
                <h3 className="mr-2.5 text-red-100 font-normal">Show Time</h3>
                <p className="m-0">{booking.showTime}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
