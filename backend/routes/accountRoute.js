import express from "express"
import { forgotPassword, getUser, login, register, resetPassword } from "../controllers/accountController.js"
import authToken from "../middleware/checkAuthToken.js"


const Router = express.Router()

Router.route("/register").post(register)
Router.route("/login").post(login)
Router.route("/forgot-password").post(forgotPassword)
Router.route("/reset-password").post(resetPassword)

Router.route("/getuser").get(authToken, getUser)
// Router.route("/getuser").get(getUser)


export default Router