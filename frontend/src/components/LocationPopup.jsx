import React, { useState, useEffect } from "react";

const LocationPopup = ({ setShowLocationPopup }) => {
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState(null);

  const getCities = async () => {
    const cities = ["HCM", "HN"];

    const cityOptions = cities.map((city) => ({
      label: city,
      value: city,
    }));

    setCities(cityOptions);
  };

  const handleSave = () => {
    fetch("http://localhost:8080/api/auth/changecity", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      },
      body: JSON.stringify({
        city: selectedCity,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.ok) {
          setShowLocationPopup(false);
          window.location.reload();
        }
      })
      .catch((err) => {
        console.error("Error saving city:", err);
      });
  };

  useEffect(() => {
    getCities();
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-50 flex justify-center items-center">
      <div className="w-1/3 h-1/3 bg-white rounded-lg flex flex-col justify-center items-center gap-5">
        <select
          className="w-[90%] rounded-full shadow-md border-none outline-none px-5 py-2 text-lg cursor-pointer"
          value={selectedCity || ""}
          onChange={(e) => setSelectedCity(e.target.value)}
        >
          <option value="" className="text-lg" disabled>
            Select your city
          </option>
          {cities.map((city) => (
            <option key={city.value} value={city.value}>
              {city.label}
            </option>
          ))}
        </select>
        <button
          className="rounded-full border-none outline-none px-5 py-2 text-lg cursor-pointer bg-[var(--col1)] text-black"
          onClick={handleSave}
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default LocationPopup;
