import { Routes, Route } from "react-router-dom";
import { setupRouter } from "./routes/setupRouter";


import Footer from "./components/Footer";

import Navbar from "./components/Navbar";
import MovieSearch from "./components/homepage/MovieSearch";
import About from "./components/homepage/About";
import Contact from "./components/homepage/Contact";


function App() {
  return (
    <>
      <div className="bg-black relative pt-28">
        <Navbar />
        <Routes>
          {setupRouter.map((route, index) => {
            const Page = route.component;
            return <Route path={route.url} key={index} element={<Page />} />;
          })}
        </Routes>
      <Footer />
      </div>
    </>
  );
}

export default App;
