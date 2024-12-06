import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  showtime: String,
  showDate: Date,
  movieId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "movies",
  },
  screenId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "screens",
  },
  seats: [
    {
      // { row: 'D', col: 0, seat_id: '10', price: 300 }
      row: String,
      col: Number,
      seat_id: String,
      price: Number,
    },
  ],
  totalPrice: Number,
  paymentId: String,
  paymentType: String,
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "accounts" },
});

const BookingModel = mongoose.model("bookings", bookingSchema)

export default BookingModel
