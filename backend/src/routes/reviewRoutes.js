const express = require("express");
const router = express.Router();

const auth = require("../middleware/authMiddleware");
const {
  createReview,
  getReviewsByMovie,
  updateReview,
  deleteReview,
} = require("../controllers/reviewController");

// Create Review
router.post("/", auth, createReview);

// Get Reviews by Movie ID
router.get("/movie/:movieId", getReviewsByMovie);

// Update Review
router.put("/:id", auth, updateReview);

// Delete Review
router.delete("/:id", auth, deleteReview);

module.exports = router;
