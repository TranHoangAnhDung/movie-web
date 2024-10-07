import { Routes, Route } from "react-router-dom";
import { setupRouter } from "./routes/setupRouter";
import Navbar from "./components/Navbar";
import MovieSearch from "./components/homepage/MovieSearch";
import About from "./components/homepage/About";
import Contact from "./components/homepage/Contact";

function App() {
  return (
    <>
      <div className="bg-black pb-10">
        <Navbar />
        <Routes>
          {setupRouter.map((route, index) => {
            const Page = route.component;
            return <Route path={route.url} key={index} element={<Page />} />;
          })}
          <Route path="/About" element={<About />} />
          <Route path="/Contact" element={<Contact />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
