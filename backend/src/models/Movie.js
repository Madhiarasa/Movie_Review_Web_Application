const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema(
  {
    tmdbId: {
      type: Number,
      required: true,
      unique: true,  // ensures no duplicate movies
    },

    title: {
      type: String,
      required: true,
    },

    poster: {
      type: String,
      default: "",
    },

    releaseDate: {
      type: String,
      default: "",
    },

    overview: {
      type: String,
      default: "",
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Movie", movieSchema);
