import { Routes, Route } from "react-router-dom";
import { setupRouter } from "./routes/setupRouter";
import Navbar from "./components/navbar";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <div className="bg-black relative">
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
