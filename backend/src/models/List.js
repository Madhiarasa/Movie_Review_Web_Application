const mongoose = require("mongoose");

const listSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      default: "",
    },

    movies: [
      {
        type: Number,  // TMDB movie ID
      }
    ]
  },
  { timestamps: true }
);

module.exports = mongoose.model("List", listSchema);
