import mongoose from "mongoose";

const screenSchema = new mongoose.Schema({
  name: String,
  location: String,
  seats: Array,
  city: String,
  screenType: String, // Example: "2D", "IMAX", "3D"
  movieSchedules: [
    {
      movieId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "movies", // Reference to the Movie model
      },
      movieName: String,
      showTime: String,
      notAvailableSeats: [
        {
          // { row: 'D', col: 0, seat_id: '10', price: 300 }
          row: String,
          col: Number,
          seat_id: String,
          price: Number,
        },
      ],
      showDate: Date,
    },
  ],
});

const ScreenModel = mongoose.model("screens", screenSchema)

export default ScreenModel