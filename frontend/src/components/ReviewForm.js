import { useState } from "react";
import { Box, TextField, Button, Typography } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";

import { createReview } from "../api/reviewApi";
import { useAuth } from "../hooks/useAuth";

const ReviewForm = ({ movieId, onReviewAdded }) => {
  const { user } = useAuth();

  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState("");

  const [error, setError] = useState("");

  const handleSubmit = async () => {
    if (!user) {
      setError("You must be logged in to write a review.");
      return;
    }

    try {
      setError("");

      await createReview({
        movieId,
        rating,
        reviewText,
      });

      setRating(0);
      setReviewText("");

      if (onReviewAdded) onReviewAdded();
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Failed to post review");
    }
  };

  return (
    <Box sx={{ marginBottom: "30px" }}>
      <Typography variant="h6" sx={{ marginBottom: "10px" }}>
        Write a Review
      </Typography>

      {error && (
        <Typography sx={{ color: "red", marginBottom: "10px" }}>
          {error}
        </Typography>
      )}

      {/* Rating Stars */}
      <Box sx={{ marginBottom: "10px" }}>
        {[1, 2, 3, 4, 5].map((star) => (
          <StarIcon
            key={star}
            sx={{
              color: star <= rating ? "gold" : "gray",
              cursor: "pointer",
            }}
            onClick={() => setRating(star)}
          />
        ))}
      </Box>

      {/* Review Text */}
      <TextField
        fullWidth
        multiline
        rows={3}
        placeholder="Write your review..."
        value={reviewText}
        onChange={(e) => setReviewText(e.target.value)}
        sx={{
          background: "white",
          borderRadius: "5px",
          marginBottom: "10px",
        }}
      />

      <Button variant="contained" onClick={handleSubmit}>
        Submit Review
      </Button>
    </Box>
  );
};

export default ReviewForm;
