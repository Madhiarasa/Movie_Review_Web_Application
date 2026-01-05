const Review = require("../models/Review");

// Create Review
exports.createReview = async (req, res) => {
  try {
    const { movieId, rating, reviewText } = req.body;

    if (!movieId || !rating) {
      return res.status(400).json({ message: "movieId and rating are required" });
    }

    const review = await Review.create({
      user: req.userId,
      movieId,
      rating,
      reviewText,
    });

    res.status(201).json({
      message: "Review added successfully",
      review,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error adding review" });
  }
};

// Get Reviews for a Movie
exports.getReviewsByMovie = async (req, res) => {
  try {
    const movieId = req.params.movieId;

    const reviews = await Review.find({ movieId })
      .populate("user", "name email") // return reviewer info
      .sort({ createdAt: -1 });

    res.json(reviews);

  } catch (error) {
    res.status(500).json({ message: "Error fetching reviews" });
  }
};

// Update a Review
exports.updateReview = async (req, res) => {
  try {
    const reviewId = req.params.id;
    const { rating, reviewText } = req.body;

    const review = await Review.findOne({ _id: reviewId, user: req.userId });

    if (!review) {
      return res.status(404).json({ message: "Review not found or unauthorized" });
    }

    review.rating = rating ?? review.rating;
    review.reviewText = reviewText ?? review.reviewText;

    await review.save();

    res.json({ message: "Review updated", review });

  } catch (error) {
    res.status(500).json({ message: "Error updating review" });
  }
};

// Delete a Review
exports.deleteReview = async (req, res) => {
  try {
    const reviewId = req.params.id;

    const review = await Review.findOneAndDelete({
      _id: reviewId,
      user: req.userId,
    });

    if (!review) {
      return res.status(404).json({ message: "Review not found or unauthorized" });
    }

    res.json({ message: "Review deleted" });

  } catch (error) {
    res.status(500).json({ message: "Error deleting review" });
  }
};
