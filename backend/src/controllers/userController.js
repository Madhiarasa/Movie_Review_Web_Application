const User = require("../models/User");
const Review = require("../models/Review");
const List = require("../models/List");
const DiaryEntry = require("../models/DiaryEntry");

// GET USER PROFILE
exports.getUserProfile = async (req, res) => {
  try {
    const userId = req.params.id;

    const user = await User.findById(userId).select("-password"); // remove password

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);

  } catch (error) {
    res.status(500).json({ message: "Error fetching user profile" });
  }
};

// UPDATE USER PROFILE
exports.updateUserProfile = async (req, res) => {
  try {
    const userId = req.userId; // from authMiddleware
    const { name, avatar } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { name, avatar },
      { new: true }
    ).select("-password");

    res.json({
      message: "Profile updated",
      user: updatedUser,
    });

  } catch (error) {
    res.status(500).json({ message: "Error updating profile" });
  }
};

// GET REVIEWS OF A USER
exports.getUserReviews = async (req, res) => {
  try {
    const userId = req.params.id;

    const reviews = await Review.find({ user: userId }).sort({
      createdAt: -1,
    });

    res.json(reviews);

  } catch (error) {
    res.status(500).json({ message: "Error fetching user reviews" });
  }
};

// GET USER LISTS
exports.getUserLists = async (req, res) => {
  try {
    const userId = req.params.id;

    const lists = await List.find({ user: userId });

    res.json(lists);

  } catch (error) {
    res.status(500).json({ message: "Error fetching user lists" });
  }
};

// GET USER DIARY ENTRIES
exports.getUserDiary = async (req, res) => {
  try {
    const userId = req.params.id;

    const diaryEntries = await DiaryEntry.find({ user: userId }).sort({
      dateWatched: -1,
    });

    res.json(diaryEntries);

  } catch (error) {
    res.status(500).json({ message: "Error fetching diary entries" });
  }
};
