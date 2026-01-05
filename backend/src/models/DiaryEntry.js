const mongoose = require("mongoose");

const diarySchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    movieId: {
      type: Number, // TMDB movie ID
      required: true,
    },

    note: {
      type: String,
      default: "",
    },

    dateWatched: {
      type: Date,
      required: true,
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("DiaryEntry", diarySchema);
