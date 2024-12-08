import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import { setupRouter } from "./routes/setupRouter";

import Footer from "./components/Footer";

import Navbar from "./components/Navbar";
import MovieSearch from "./components/homepage/MovieSearch";
import About from "./components/homepage/About";
import Contact from "./components/homepage/Contact";
import ScrollTopTop from "./components/detailmoviepage/ScrollToTop";



function App() {
  const [userName, setUserName] = useState(null)

  return (
    <>
      <div className="bg-black relative pt-28">
        <Navbar userName={userName} setUserName={setUserName}/>
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
