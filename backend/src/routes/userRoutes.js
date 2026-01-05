const express = require("express");
const router = express.Router();

const auth = require("../middleware/authMiddleware");

const {
  getUserProfile,
  updateUserProfile,
  getUserReviews,
  getUserLists,
  getUserDiary,
} = require("../controllers/userController");

// GET user profile
router.get("/:id", getUserProfile);

// UPDATE user profile (requires login)
router.put("/update", auth, updateUserProfile);

// GET user reviews
router.get("/:id/reviews", getUserReviews);

// GET user lists
router.get("/:id/lists", getUserLists);

// GET user diary
router.get("/:id/diary", getUserDiary);

module.exports = router;
