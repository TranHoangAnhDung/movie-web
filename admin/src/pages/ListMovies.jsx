import axios from "axios";
import React, { useEffect, useState } from "react";
import { backendUrl } from "../App";
import { toast } from "react-toastify";

const ListMovies = () => {
  const [list, setList] = useState([]);

  const fetchList = async () => {
    try {
      const response = await axios.get(backendUrl + "/api/movie/movies");
      if (response.data.ok) {
        setList(response.data.data);
        console.log(response.data);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const removeMovie = async (id) => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.post(
        backendUrl + "/api/movie/remove",
        { id },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data.ok) {
        toast.success(response.data.ok);

        await fetchList();
      } else {
        toast.error(response.data.ok);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <>
      <p className="mb-2">All Movies List</p>
      <div className="flex flex-col gap-2">
        {/* ---- List Table Title ------ */}
        <div className="hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr_1fr] items-center py-1 px-2 border bg-gray-100 text-sm ">
          <b>Image</b>
          <b>Title</b>
          <b>Rating</b>
          <b>Genre</b>
          <b>Duration</b>
          <b className="text-center">Action</b>
        </div>

        {/* ---- Movie List ------ */}
        {list.map((item, index) => {
          return (
            <div
              key={index}
              className="grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr_1fr] items-center gap-2 py-1 px-2 border text-sm"
            >
              <img className="w-24" src={item.portraitImgUrl} alt="" />
              <p>{item.title}</p>
              <p>{item.rating}</p>

              <div className="flex flex-col gap-1">
                {item.genre.map((genre, genreIndex) => (
                  <p key={genreIndex} className="inline-block">
                    {genre}
                  </p>
                ))}
              </div>

              <p>{item.duration}</p>
              <p className="text-right md:text-center cursor-pointer text-lg">
                X
              </p>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default ListMovies;
