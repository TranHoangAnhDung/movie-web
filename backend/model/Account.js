import mongoose from "mongoose"

const accountSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    bookings: Array
},{timestamps: true})

const AccountModel = mongoose.model("accounts", accountSchema)

export default AccountModel