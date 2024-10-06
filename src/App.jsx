import { Routes, Route } from "react-router-dom";
import { setupRouter } from "./routes/setupRouter";
import Navbar from "./components/navbar";
import MovieSearch from "./components/homepage/MovieSearch";

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
          <Route path="/search/keyword" element={<MovieSearch />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
