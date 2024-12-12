import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import image from "../assets/movie-icon.jpg";

const Sidebar = () => {
  const [isAddMenuOpen, setIsAddMenuOpen] = useState(false);
  const [isListsOpen, setIsListsOpen] = useState(false);

  const toggleAddMenu = () => {
    setIsAddMenuOpen(!isAddMenuOpen);
  };

  const toggleLists = () => {
    setIsListsOpen(!isListsOpen);
  };

  return (
    <div className="w-[18%] min-h-screen border-r-2">
      <div className="flex flex-col gap-4 pt-6 pl-[20%] text-[15px]">
        {/* Add Menu Section */}
        <div className="flex flex-col gap-3">
          <button
            onClick={toggleAddMenu}
            className="flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-l"
          >
            <img className="w-5 h-5" src={image} alt="" />
            <p className="hidden md:block">Add Items</p>
          </button>

          {/* Collapsible Add Menu Items */}
          {isAddMenuOpen && (
            <div className="flex flex-col gap-3 ml-4">
              <NavLink
                to="/createmovie"
                className="flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-l"
              >
                <img className="w-5 h-5" src={image} alt="" />
                <p className="hidden md:block">Add Movie</p>
              </NavLink>

              <NavLink
                to="/screen"
                className="flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-l"
              >
                <img className="w-5 h-5" src={image} alt="" />
                <p className="hidden md:block">Add Screen</p>
              </NavLink>

              <NavLink
                to="/schedule"
                className="flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-l"
              >
                <img className="w-5 h-5" src={image} alt="" />
                <p className="hidden md:block">Add Schedule</p>
              </NavLink>

              <NavLink
                to="/celeb"
                className="flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-l"
              >
                <img className="w-5 h-5" src={image} alt="" />
                <p className="hidden md:block">Add Celeb</p>
              </NavLink>
            </div>
          )}
        </div>

        {/* List All Section */}
        <div className="flex flex-col gap-3">
          <button
            onClick={toggleLists}
            className="flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-l"
          >
            <img className="w-5 h-5" src={image} alt="" />
            <p className="hidden md:block">Lists</p>
          </button>

          {/* Collapsible List Items */}
          {isListsOpen && (
            <div className="flex flex-col gap-3 ml-4">
              <NavLink
                to="/listmovies"
                className="flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-l"
              >
                <img className="w-5 h-5" src={image} alt="" />
                <p className="hidden md:block">All Movies</p>
              </NavLink>

              <NavLink
                to="/listscreens"
                className="flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-l"
              >
                <img className="w-5 h-5" src={image} alt="" />
                <p className="hidden md:block">All Screens</p>
              </NavLink>

              <NavLink
                to="/listschedules"
                className="flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-l"
              >
                <img className="w-5 h-5" src={image} alt="" />
                <p className="hidden md:block">All Schedules</p>
              </NavLink>

            </div>
          )}
        </div>
        {/* <NavLink
          to="/listmovies"
          className="flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-l"
        >
          <img className="w-5 h-5" src={image} alt="" />
          <p className="hidden md:block">Lists</p>
        </NavLink> */}
      </div>
    </div>
  );
};

export default Sidebar;
