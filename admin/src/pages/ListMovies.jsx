import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

import { backendUrl } from "../App";
import image from "../assets/noteicon.jpg";

const ListMovies = () => {
  const [list, setList] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [currentMovie, setCurrentMovie] = useState(null); // Movie being edited
  const [updatedMovie, setUpdatedMovie] = useState({});
  const [newPortraitImg, setNewPortraitImg] = useState(null);

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

  const openModal = (movie) => {
    setCurrentMovie(movie);
    setUpdatedMovie(movie); // Pre-fill form with current movie data
    setNewPortraitImg(null);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setCurrentMovie(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedMovie({ ...updatedMovie, [name]: value });
  };

  const handleImageUpload = async (file) => {
    try {
      const formData = new FormData();
      formData.append("myimage", file);

      const response = await axios.post(
        `${backendUrl}/image/uploadimage`,
        formData
      );
      if (response.data.ok) {
        return response.data.imageUrl; // Return the uploaded image URL
      } else {
        toast.error("Image upload failed");
        return null;
      }
    } catch (error) {
      console.error("Image upload error:", error);
      toast.error("Image upload failed");
      return null;
    }
  };

  const handleUpdate = async () => {
    try {
      const token = localStorage.getItem("token");
      let portraitImgUrl = updatedMovie.portraitImgUrl;

      if (newPortraitImg) {
        portraitImgUrl = await handleImageUpload(newPortraitImg);
        if (!portraitImgUrl) return; // Stop if image upload fails
      }

      const response = await axios.put(
        `${backendUrl}/api/movie/update/${currentMovie._id}`,
        { ...updatedMovie, portraitImgUrl },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.data.ok) {
        toast.success("Movie updated successfully!");
        closeModal();
        fetchList(); // Refresh the list
      } else {
        toast.error(response.data.message);
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
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Image
              </th>
              <th scope="col" className="px-6 py-3">
                Title
              </th>
              <th scope="col" className="px-6 py-3">
                Rating
              </th>
              <th scope="col" className="px-6 py-3">
                Genre
              </th>
              <th scope="col" className="px-6 py-3">
                Duration
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>

          {/* ---- Movie List ------ */}
          <tbody>
            {list.map((item, index) => {
              return (
                <tr
                  key={index}
                  className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    <img className="w-24" src={item.portraitImgUrl} alt="" />
                  </th>
                  <td className="px-6 py-4">{item.title}</td>
                  <td className="px-6 py-4">{item.rating}</td>

                  <td className="px-6 py-4">
                    {item.genre.map((genre, genreIndex) => (
                      <p key={genreIndex} className=" flex flex-col gap-1 ">
                        {genre}
                      </p>
                    ))}
                  </td>

                  <td className="px-6 py-4">{item.duration}</td>

                  <td className="px-6 py-[50%] flex flex-row gap-7">
                    <img
                      src={image}
                      className="cursor-pointer text-white hover:text-blue-700 w-5"
                      onClick={() => openModal(item)}
                    />
                    <span
                      className="cursor-pointer text-red-500 hover:text-red-700"
                      onClick={() => removeMovie(item._id)}
                    >
                      X
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* <div className="flex flex-col gap-2">  */}
      {/* ---- List Table Title ------ */}
      {/* <div className="hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr_1fr] items-center py-1 px-2 border bg-gray-100 text-sm ">
          <b>Image</b>
          <b>Title</b>
          <b>Rating</b>
          <b>Genre</b>
          <b>Duration</b>
          <b className="text-center">Action</b>
        </div>

        {/* ---- Movie List ------ */}
      {/* {list.map((item, index) => {
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

              <div className="flex justify-end md:justify-center gap-7">
                <img
                  src={image}
                  className="cursor-pointer text-blue-500 hover:text-blue-700 w-5"
                  onClick={() => openModal(item)}
                />
                <span
                  className="cursor-pointer text-red-500 hover:text-red-700"
                  onClick={() => removeMovie(item._id)}
                >
                  X
                </span>
              </div>
            </div>
          );
        })}
      </div> */}

      {/* Modal for Editing Movie */}
      {modalIsOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-md shadow-lg w-[90%] max-w-[500px]">
            <h3 className="text-xl font-semibold mb-4">Update Movie</h3>

            {/* Portrait Image Upload */}
            <div>
              <label className="block mb-1">Portrait Image</label>
              <input
                type="file"
                onChange={(e) => setNewPortraitImg(e.target.files[0])}
                className="w-full mb-2"
              />
            </div>

            <div>
              <label className="block mb-1">Movie Title</label>
              <input
                type="text"
                name="title"
                placeholder="Title"
                value={updatedMovie.title || ""}
                onChange={handleInputChange}
                className="w-full mb-2 p-2 border rounded-md"
              />
            </div>

            <div>
              <label className="block mb-1">Genre</label>
              <input
                name="genre"
                placeholder="Genre"
                value={updatedMovie.genre || ""}
                onChange={handleInputChange}
                className="w-full mb-2 p-2 border rounded-md"
              />
            </div>

            <div>
              <label className="block mb-1">Rating</label>

              <input
                type="number"
                name="rating"
                placeholder="Rating"
                value={updatedMovie.rating || ""}
                onChange={handleInputChange}
                className="w-full mb-2 p-2 border rounded-md"
              />
            </div>
            <div>
              <label className="block mb-1">Duration (minutes)</label>

              <input
                type="number"
                name="duration"
                placeholder="Duration"
                value={updatedMovie.duration || ""}
                onChange={handleInputChange}
                className="w-full mb-2 p-2 border rounded-md"
              />
            </div>

            <div className="flex gap-4 justify-end">
              <button
                onClick={closeModal}
                className="bg-gray-300 px-4 py-2 rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdate}
                className="bg-blue-500 text-white px-4 py-2 rounded-md"
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ListMovies;
