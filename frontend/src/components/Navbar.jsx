import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = ({ userName, setUserName }) => {
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState(""); // search value

  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUserName = localStorage.getItem("userName");
    storedUserName ? setUserName(storedUserName) : [];
  });

  const handleLogout = () => {
    // Xóa thông tin đăng nhập khi người dùng logout
    localStorage.removeItem("userName");
    setUserName(null);
    navigate("/login");
  };

  const toggleDropdown = () => {
    setIsDropdownVisible(!isDropdownVisible)
  }

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search/${searchTerm}`); // Điều hướng đến trang /search với query
      setSearchTerm(""); // Reset ô tìm kiếm sau khi tìm
    } else {
      alert("Vui lòng nhập từ khóa tìm kiếm."); // Thông báo nếu ô tìm kiếm trống
    }
  };

  return (
    <nav>
      <div className="w-[100%] flex items-center justify-between py-8 px-8 fixed top-0 bg-black z-50 gap-5">
        {/* logo section */}
        <div className="text-2xl flex items-center gap-2 uppercase">
          <p className="text-red-500">
            <i className="fa fa-film"></i>
          </p>
          <p className="text-red-500 font-bold">Mindx</p>
          <p className="text-white">Star</p>
        </div>
        {/* Menu section */}
        <div className="hidden md:block">
          <ul className="flex items-center gap-6 text-white ">
            <li className="text-center group">
              <Link
                to="/"
                className="text-white font-semibold group-hover:text-red-600 transition duration-500"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/About"
                className="text-white font-semibold hover:text-red-600 transition duration-300"
              >
                About
              </Link>
            </li>
            <li>
              <Link
                to="/Contact"
                className="text-white font-semibold hover:text-red-600 transition duration-300"
              >
                Contact
              </Link>
            </li>
          </ul>
        </div>
        {/* search section */}
        <form onSubmit={handleSearch}>
          <div className="w-full max-w-sm min-w-[200px] hidden md:block">
            <div className="relative flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="absolute w-5 h-5 top-2.5 left-2.5 text-slate-400"
              >
                <path
                  fillRule="evenodd"
                  d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z"
                  clipRule="evenodd"
                />
              </svg>
              <input
                className="w-full bg-transparent placeholder:text-slate-400 text-slate-50 text-sm border
                 border-slate-200 rounded-md pl-10 pr-3 py-2 transition duration-300 ease focus:outline-none
                  focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                placeholder="Search Movie"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button
                className="rounded-md bg-red-500 py-2 px-4 
                border border-transparent text-center text-sm text-white transition-all shadow-md 
                hover:shadow-lg focus:bg-red-700 focus:shadow-none active:bg-red-700 hover:bg-red-700 active:shadow-none 
                disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ml-2"
                type="submit"
              >
                Search
              </button>
            </div>
          </div>
        </form>
        {/* Login Section */}
        <div className="hidden md:block">
          {userName ? (
            <div className="relative">
              <button onClick={toggleDropdown} className="rounded-md bg-red-500 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-red-700 focus:shadow-none active:bg-red-700 hover:bg-red-700 active:shadow-none ml-4">
                Xin Chào, {userName}
              </button>

              {/* Dropdown logout */}
              {isDropdownVisible && (
                <div className="absolute mt-2 ml-11 w-30 bg-white text-black rounded-md shadow-md">
                  <p
                    className="px-4 py-2 cursor-pointer hover:bg-gray-200"
                    onClick={handleLogout}
                  >
                    Logout
                  </p>
                </div>
              )}
            </div>
          ) : (
            <Link
              to={"/Login"}
              className="rounded-md bg-red-500 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-red-700 focus:shadow-none active:bg-red-700 hover:bg-red-700 active:shadow-none ml-4"
            >
              Login
            </Link>
          )}
        </div>

        {/* Mobile menu  section */}
        <div className="block md:hidden">
          <button
            className={`text-3xl text-white ${
              open ? "hidden " : "block"
            } transition duration-1000 `}
            onClick={() => setOpen(!open)}
          >
            <i className="fa fa-bars"></i>
          </button>
          <button
            className={`text-3xl text-white ${
              !open ? "hidden" : "block"
            } transition duration-500 `}
            onClick={() => setOpen(!open)}
          >
            <i className="fa fa-times"></i>
          </button>
        </div>
        {/* Menu sidebar section */}
        {open && (
          <AnimatePresence>
            <motion.div
              initial={{ opacity: 0, y: -80 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -80 }}
              transition={{ duration: 0.3 }}
              className="absolute top-20 left-0 w-full  z-20"
            >
              <div className="bg-red-500 py-10 m-6 rounded-3xl">
                <ul className="flex flex-col items-center gap-6 text-white ">
                  <li className="text-center group">
                    <Link
                      to="/"
                      className="text-white font-semibold group-hover:text-black transition duration-500"
                      onClick={() => setOpen(false)}
                    >
                      Home
                    </Link>

                    {/* <hr className="w-[0] h-[1px] bg-red-600 border-none mx-auto group-hover:w-[70%] transition duration-500" /> */}
                  </li>
                  <li>
                    <Link
                      to="/About"
                      className="text-white font-semibold hover:text-red-600 transition duration-300"
                      onClick={() => setOpen(false)}
                    >
                      About
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/Contact"
                      className="text-white font-semibold hover:text-red-600 transition duration-300"
                      onClick={() => setOpen(false)}
                    >
                      Contact
                    </Link>
                  </li>
                </ul>
              </div>
            </motion.div>
          </AnimatePresence>
        )}
      </div>

      {/* Search mobile */}
      <form onSubmit={handleSearch}>
        <div className="flex items-center justify-center w-full mb-8 md:hidden">
          <div className="relative flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="absolute w-5 h-5 top-2.5 left-2.5 text-slate-400"
            >
              <path
                fillRule="evenodd"
                d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z"
                clipRule="evenodd"
              />
            </svg>
            <input
              className="w-full bg-transparent placeholder:text-slate-400 text-slate-50 text-sm border
                 border-slate-200 rounded-md pl-10 pr-3 py-2 transition duration-300 ease focus:outline-none
                  focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
              placeholder="Search Movie"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button
              className="rounded-md bg-red-500 py-2 px-4 
                border border-transparent text-center text-sm text-white transition-all shadow-md 
                hover:shadow-lg focus:bg-red-700 focus:shadow-none active:bg-red-700 hover:bg-red-700 active:shadow-none 
                disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ml-2"
              type="submit"
            >
              Search
            </button>
          </div>
        </div>
      </form>
      {/* Login button for mobile */}
      <div className="flex justify-center md:hidden">
        <Link
          to={"/Login"}
          className="rounded-md bg-red-500 py-2 px-4 
      border border-transparent text-center text-sm text-white transition-all shadow-md 
      hover:shadow-lg focus:bg-red-700 focus:shadow-none active:bg-red-700 hover:bg-red-700 active:shadow-none 
      mt-2"
        >
          Login
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;