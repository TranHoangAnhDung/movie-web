import "./App.css";
import { useEffect, useState } from "react";
import {Routes, Route} from "react-router-dom"

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Sidebar from "./components/Sidebar";

import CreateMoviePage from "./pages/CreateMovie"
import CreateCinemaPage from "./pages/CreateCinema";
import CreateSchedule from "./pages/CreateSchedule";
import ListMovies from "./pages/ListMovies";
import CreateCeleb from "./pages/CreateCeleb";

export const backendUrl = import.meta.env.VITE_BACKEND_URL;

function App() {
  const [token, setToken] = useState(
    localStorage.getItem("token") ? localStorage.getItem("token") : ""
  );

  useEffect(() => {
    localStorage.setItem("token", token);
  }, [token]);

  return (
    <div className="bg-gray-50 min-h-screen">
      <ToastContainer />
      {token === "" ? (
        <Login setToken={setToken} />
      ) : (
        <>
          <Navbar setToken= {setToken}/>
          <hr />

          <div className="flex w-full">
            <Sidebar />

            <div className="w-[70%] mx-auto ml-[max(5vw,25px) my-8 text-gray-600 text-base">
              <Routes>
                <Route path="/createmovie" element={<CreateMoviePage />}/>
                <Route path="/schedule" element={<CreateSchedule />} />
                <Route path="/cinema" element={<CreateCinemaPage />} />
                <Route path="/celeb" element={<CreateCeleb />}/>
                <Route path="/listmovies" element={<ListMovies />}/>

              </Routes>

            </div>

          </div>
        </>
      )}
    </div>
  );
}

export default App;
