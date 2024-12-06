import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors"
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import nodemailer from 'nodemailer'

import connectDB from "./config/mongodb.js"
import connectCloudinary from "./config/cloudinary.js";

import accountRoute from "./routes/accountRoute.js"
import movieRoute from "./routes/movieRoute.js"
import adminRoute from "./routes/adminRoute.js"
import imageRoute from "./routes/imageRoute.js"

// App Config
dotenv.config();
connectDB()
// connectCloudinary()
const app = express();

// middleware
// Dùng CORS để FE có thể gửi api đến BE thông qua method
app.use(cors({
  origin: "http://localhost:5173",
  methods: "GET, POST, PUT, DELETE",
  allowedHeaders: "Content-Type, Authorization",
  credentials: true
}))
app.use(express.json());

// api endpoints
app.use("/api/auth", accountRoute)
app.use("/admin", adminRoute)
app.use("/api/movie", movieRoute)
app.use("/image", imageRoute)

app.listen(8080, () => {
  console.log("Server is running");
});
