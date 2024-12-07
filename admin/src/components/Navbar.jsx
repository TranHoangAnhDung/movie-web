import React from "react";
import {Link} from "react-router-dom"

import image from "../assets/movie-icon.jpg"


const Navbar = ({setToken}) => {
  return (
    <>
    
    <div className="flex items-center py-3 px-[4%] justify-between">
    <div className="text-2xl flex items-center gap-2 uppercase">
          <p className="text-red-500">
            <i className="fa fa-film"></i>
          </p>
          <p className="text-red-500 font-bold">Mindx</p>
          <p className="text-black">Star</p>
        </div>
      <button onClick={() => setToken("")} className="bg-gray-600 text-white px-5 py-2 sm:px-7 sm:py-2 rounded-full text-xs sm:text-sm">
        Log Out
      </button>

    </div>
  
      {/* <div className="space-x-4">
      <Link href='/pages/movie/createmovie' className="text-black hover:bg-black hover:text-white px-3 py-1 rounded transition">Add Movie</Link>
       <Link href='/pages/screen' className="text-black hover:bg-black hover:text-white px-3 py-1 rounded transition">Add Screen</Link>
       <Link href='/pages/schedule' className="text-black hover:bg-black hover:text-white px-3 py-1 rounded transition">Add Schedule</Link>
        <Link href='/pages/movie/addceleb' className="text-black hover:bg-black hover:text-white px-3 py-1 rounded transition">Add Celeb</Link>        
      </div> */}
    </>
  );
};

export default Navbar;
