import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import { setupRouter } from "./routes/setupRouter";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"

import Footer from "./components/Footer";

import Navbar from "./components/Navbar";
import MovieSearch from "./components/homepage/MovieSearch";
import About from "./components/homepage/About";
import Contact from "./components/homepage/Contact";
import ScrollTopTop from "./components/detailmoviepage/ScrollToTop";

export const backendUrl = import.meta.env.VITE_BACKEND_URL

function App() {
  const [userName, setUserName] = useState(null)

  return (
    <>
      <div className="bg-black relative pt-20">
        <Navbar userName={userName} setUserName={setUserName}/>
        <ToastContainer />
        <Routes>
          {setupRouter.map((route, index) => {
            const Page = route.component;
            return <Route path={route.url} key={index} element={<Page setUserName={setUserName}/>} />;
          })}
        </Routes>
        <ScrollTopTop />
      <Footer />
      </div>
    </>
  );
}

export default App;
