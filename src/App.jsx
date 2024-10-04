import { Routes, Route } from "react-router-dom";
import { setupRouter } from "./routes/setupRouter";
import Navbar from "./components/navbar";

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
        </Routes>
      </div>
    </>
  );
}

export default App;
