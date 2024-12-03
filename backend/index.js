import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import cors from "cors"

import AccountModel from "./model/Account.js";

dotenv.config();

mongoose.connect(
  "mongodb+srv://kennySang:dragon9076@cluster0.r6njk.mongodb.net/MOVIE_WEB"
);

const app = express();
app.use(cors({
  origin: "http://localhost:5173",
  methods: "GET, POST, PUT, DELETE",
  allowedHeaders: "Content-Type, Authorization"
}))
app.use(express.json());

app.post("/api/auth/register", async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password)
      return res.status(401).json("Require name, email, password");

    const existedAccount = await AccountModel.findOne({ email });
    if (existedAccount) return res.status(400).json("Email already exists");

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    const newAccount = await AccountModel.create({
      name,
      email,
      password: hash,
    });

    res.status(201).send({
      message: "Register successfully",
      newAccount,
      success: true,
    });

  } catch (error) {
    res.status(403).send({
      message: error.message,
      data: null,
      success: false,
    });
  }
});

app.post("/api/auth/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const account = await AccountModel.findOne({ email });
    if (!account) return res.status(404).json("Invalid Email or Password");

    // So sánh mật khẩu người dùng nhập với mật khẩu đã hash trong cơ sở dữ liệu
    const isMatch = bcrypt.compare(password, account.password);
    if (!isMatch) return res.status(400).json("Invalid Email or Password");

    const token = jwt.sign({ id: account._id }, process.env.SECRET_KEY, {expiresIn: "1h"});

    res.status(201).send({
      message: "Login successfully",
      token, 
      name: account.name,
      success: true,
    });

  } catch (error) {
    res.status(403).send({
      message: error.message,
      data: null,
      success: false,
    });
  }
});

app.listen(8080, () => {
  console.log("Server is running");
});
