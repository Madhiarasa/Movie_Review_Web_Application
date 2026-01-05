const mongoose = require("mongoose");

const activitySchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    type: {
      type: String,
      required: true,
      enum: [
        "REVIEWED_MOVIE",
        "RATED_MOVIE",
        "CREATED_LIST",
        "FOLLOWED_USER",
        "DIARY_ENTRY",
      ],
    },

    movieId: {
      type: Number, // TMDB movie ID
      default: null,
    },

    targetUser: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },

    listId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "List",
      default: null,
    },

    note: {
      type: String,
      default: "",
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Activity", activitySchema);
