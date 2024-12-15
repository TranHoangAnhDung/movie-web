import React, { useState } from "react";
import { toast } from "react-toastify";

const CreateCinemaPage = () => {
  const tempSeatLayout = [
    {
      // platinum
      type: "platinum",
      rows: [
        {
          // row 2
          rowname: "H",
          cols: [
            // col 1
            {
              seats: [
                { seat_id: "1" },
                { seat_id: "2" },
                { seat_id: "3" },
                { seat_id: "4" },
                { seat_id: "5" },
                { seat_id: "6" },
                { seat_id: "7" },
                { seat_id: "8" },
                { seat_id: "9" },
                { seat_id: "10" },
              ],
            },
            // col 2
            {
              seats: [
                { seat_id: "1" },
                { seat_id: "2" },
                { seat_id: "3" },
                { seat_id: "4" },
                { seat_id: "5" },
                { seat_id: "6" },
                { seat_id: "7" },
                { seat_id: "8" },
                { seat_id: "9" },
                { seat_id: "10" },
              ],
            },
          ],
        },
        {
          rowname: "G",
          cols: [
            // col 1
            {
              seats: [
                { seat_id: "1" },
                { seat_id: "2" },
                { seat_id: "3" },
                { seat_id: "4" },
                { seat_id: "5" },
                { seat_id: "6" },
                { seat_id: "7" },
                { seat_id: "8" },
                { seat_id: "9" },
                { seat_id: "10" },
              ],
            },
            // col 2
            {
              seats: [
                { seat_id: "1" },
                { seat_id: "2" },
                { seat_id: "3" },
                { seat_id: "4" },
                { seat_id: "5" },
                { seat_id: "6" },
                { seat_id: "7" },
                { seat_id: "8" },
                { seat_id: "9" },
                { seat_id: "10" },
              ],
            },
          ],
        },
        {
          // row 2
          rowname: "F",
          cols: [
            // col 1
            {
              seats: [
                { seat_id: "1" },
                { seat_id: "2" },
                { seat_id: "3" },
                { seat_id: "4" },
                { seat_id: "5" },
                { seat_id: "6" },
                { seat_id: "7" },
                { seat_id: "8" },
                { seat_id: "9" },
                { seat_id: "10" },
              ],
            },
            // col 2
            {
              seats: [
                { seat_id: "1" },
                { seat_id: "2" },
                { seat_id: "3" },
                { seat_id: "4" },
                { seat_id: "5" },
                { seat_id: "6" },
                { seat_id: "7" },
                { seat_id: "8" },
                { seat_id: "9" },
                { seat_id: "10" },
              ],
            },
          ],
        },
      ],
      price: 500,
    },
    {
      // gold
      type: "gold",
      rows: [
        {
          // row 2
          rowname: "E",
          cols: [
            // col 1
            {
              seats: [
                { seat_id: "1" },
                { seat_id: "2" },
                { seat_id: "3" },
                { seat_id: "4" },
                { seat_id: "5" },
                { seat_id: "6" },
                { seat_id: "7" },
                { seat_id: "8" },
                { seat_id: "9" },
                { seat_id: "10" },
              ],
            },
            // col 2
            {
              seats: [
                { seat_id: "1" },
                { seat_id: "2" },
                { seat_id: "3" },
                { seat_id: "4" },
                { seat_id: "5" },
                { seat_id: "6" },
                { seat_id: "7" },
                { seat_id: "8" },
                { seat_id: "9" },
                { seat_id: "10" },
              ],
            },
          ],
        },
        {
          rowname: "D",
          cols: [
            // col 1
            {
              seats: [
                { seat_id: "1" },
                { seat_id: "2" },
                { seat_id: "3" },
                { seat_id: "4" },
                { seat_id: "5" },
                { seat_id: "6" },
                { seat_id: "7" },
                { seat_id: "8" },
                { seat_id: "9" },
                { seat_id: "10" },
              ],
            },
            // col 2
            {
              seats: [
                { seat_id: "1" },
                { seat_id: "2" },
                { seat_id: "3" },
                { seat_id: "4" },
                { seat_id: "5" },
                { seat_id: "6" },
                { seat_id: "7" },
                { seat_id: "8" },
                { seat_id: "9" },
                { seat_id: "10" },
              ],
            },
          ],
        },
        {
          // row 2
          rowname: "C",
          cols: [
            // col 1
            {
              seats: [
                { seat_id: "1" },
                { seat_id: "2" },
                { seat_id: "3" },
                { seat_id: "4" },
                { seat_id: "5" },
                { seat_id: "6" },
                { seat_id: "7" },
                { seat_id: "8" },
                { seat_id: "9" },
                { seat_id: "10" },
              ],
            },
            // col 2
            {
              seats: [
                { seat_id: "1" },
                { seat_id: "2" },
                { seat_id: "3" },
                { seat_id: "4" },
                { seat_id: "5" },
                { seat_id: "6" },
                { seat_id: "7" },
                { seat_id: "8" },
                { seat_id: "9" },
                { seat_id: "10" },
              ],
            },
          ],
        },
      ],
      price: 300,
    },
    {
      // silver - 20 objects
      type: "silver",
      rows: [
        {
          rowname: "B",
          cols: [
            // col 1
            {
              seats: [
                { seat_id: "1" },
                { seat_id: "2" },
                { seat_id: "3" },
                { seat_id: "4" },
                { seat_id: "5" },
                { seat_id: "6" },
                { seat_id: "7" },
                { seat_id: "8" },
                { seat_id: "9" },
                { seat_id: "10" },
              ],
            },
            // col 2
            {
              seats: [
                { seat_id: "1" },
                { seat_id: "2" },
                { seat_id: "3" },
                { seat_id: "4" },
                { seat_id: "5" },
                { seat_id: "6" },
                { seat_id: "7" },
                { seat_id: "8" },
                { seat_id: "9" },
                { seat_id: "10" },
              ],
            },
          ],
        },
        {
          // row 2
          rowname: "A",
          cols: [
            // col 1
            {
              seats: [
                { seat_id: "1" },
                { seat_id: "2" },
                { seat_id: "3" },
                { seat_id: "4" },
                { seat_id: "5" },
                { seat_id: "6" },
                { seat_id: "7" },
                { seat_id: "8" },
                { seat_id: "9" },
                { seat_id: "10" },
              ],
            },
            // col 2
            {
              seats: [
                { seat_id: "1" },
                { seat_id: "2" },
                { seat_id: "3" },
                { seat_id: "4" },
                { seat_id: "5" },
                { seat_id: "6" },
                { seat_id: "7" },
                { seat_id: "8" },
                { seat_id: "9" },
                { seat_id: "10" },
              ],
            },
          ],
        },
      ],
      price: 150,
    },
  ];

  const [screen, setScreen] = useState({
    name: "",
    location: "",
    seats: tempSeatLayout,
    city: "",
    screenType: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setScreen({ ...screen, [name]: value });
  };

  const handleScreenTypeChange = (e) => {
    const { value } = e.target;
    setScreen({ ...screen, screenType: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (
        screen.name === "" ||
        screen.location === "" ||
        screen.seats.length == 0 ||
        screen.city === "" ||
        screen.screenType === ""
      ) {
        toast.error("Please fill all the fields", {
          position: "top-center",
        });
        return;
      }

      const adminToken = localStorage.getItem("token");

      const response = await fetch(
        "http://localhost:8080/api/movie/createscreen",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${adminToken}`,
          },
          body: JSON.stringify(screen),
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log("Screen creation successful", data);

        toast.success("Screen Created Successfully", {
          position: "top-center",
        });
      } else {
        console.error("Screen creation failed", response.statusText);
        toast.error("Screen Creation Failed", {
          position: "top-center",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full max-w-lg mx-auto p-6 bg-white border rounded-md shadow-sm">
      <div className="mb-4">
        <label htmlFor="name" className="block mb-1 font-medium text-gray-700">
          Name
        </label>
        <input
          type="text"
          name="name"
          id="name"
          placeholder="Enter screen name"
          value={screen.name}
          onChange={handleInputChange}
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
        />
      </div>

      <div className="mb-4">
        <label
          htmlFor="location"
          className="block mb-1 font-medium text-gray-700"
        >
          Location
        </label>
        <input
          type="text"
          name="location"
          id="location"
          placeholder="Enter location"
          value={screen.location}
          onChange={handleInputChange}
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="city" className="block mb-1 font-medium text-gray-700">
          City
        </label>
        <input
          type="text"
          name="city"
          id="city"
          placeholder="Enter city"
          value={screen.city}
          onChange={handleInputChange}
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
        />
      </div>

      <div className="mb-4">
        <p className="mb-2 font-medium text-gray-700">Screen Type:</p>
        <div className="flex flex-wrap gap-4">
          {["3D", "2D", "4D", "IMAX"].map((type) => (
            <label key={type} className="flex items-center space-x-2">
              <input
                type="radio"
                name="screenType"
                value={type}
                checked={screen.screenType === type}
                onChange={handleScreenTypeChange}
                className="text-blue-500 focus:ring focus:ring-blue-300"
              />
              <span className="text-gray-700">{type}</span>
            </label>
          ))}
        </div>
      </div>

      <button
        onClick={handleSubmit}
        className="w-full px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
      >
        Create Screen
      </button>
    </div>
  );
};

export default CreateCinemaPage;
