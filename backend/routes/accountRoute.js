import express from "express"
import { forgotPassword, login, register, resetPassword } from "../controllers/accountController.js"


const Router = express.Router()

Router.route("/register").post(register)
Router.route("/login").post(login)
Router.route("/forgot-password").post(forgotPassword)
Router.route("/reset-password").post(resetPassword)

export default Router