import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search?query=${searchTerm}`); // Điều hướng đến trang /search với query
      setSearchTerm(""); // Reset ô tìm kiếm sau khi tìm
    } else {
      alert("Vui lòng nhập từ khóa tìm kiếm."); // Thông báo nếu ô tìm kiếm trống
    }
  };

  return (
    <div className="p-4 bg-black flex items-center justify-between flex-wrap">
      <div className="flex items-center space-x-4">
        <h1 className="text-[30px] uppercase font-bold text-red-700">Movie</h1>
        <nav className="flex items-center space-x-4">
          <a href="/" className="text-white">
            Home
          </a>
          <a href="#" className="text-white">
            About
          </a>
          <a href="#" className="text-white">
            Contact
          </a>
        </nav>
      </div>
      <form onSubmit={handleSearch} className="flex items-center space-x-4">
        <input
          type="text"
          placeholder="Search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="p-4 text-black rounded-full w-60"
        />
        <button
          type="submit" // Đảm bảo button hoạt động như một submit
          className="p-3 text-white bg-red-600 rounded-full"
        >
          Search
        </button>
      </form>
    </div>
  );
};

export default Navbar;
