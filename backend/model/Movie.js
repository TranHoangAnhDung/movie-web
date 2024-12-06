import mongoose from "mongoose";

const movieSchema = new mongoose.Schema({
  title: String,
  description: String,
  portraitImgUrl: String,
  landscapeImgUrl: String,
  rating: Number,
  genre: [String], // You can store multiple genres as an array of strings
  duration: Number, // Duration in minutes
  cast: [
    {
      celebType: String,
      celebName: String,
      celebRole: String,
      celebImage: String,
    },
  ],
  crew: [
    {
      celebType: String,
      celebName: String,
      celebRole: String,
      celebImage: String,
    },
  ],
});

const MovieModel = mongoose.model("movies", movieSchema);

export default MovieModel;
