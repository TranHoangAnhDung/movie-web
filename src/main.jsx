import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDs0G3_v8zxD_KoBDtPX0ySs4hofo11hhQ",
  authDomain: "movies-web-85cca.firebaseapp.com",
  projectId: "movies-web-85cca",
  storageBucket: "movies-web-85cca.appspot.com",
  messagingSenderId: "599943447022",
  appId: "1:599943447022:web:f5a3146fc0b4424e294eff",
  measurementId: "G-FNWE5M0GR2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);
