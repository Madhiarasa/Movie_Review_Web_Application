// frontend/src/api/reviewApi.js
import API from "./api";

/**
 * Review related API functions
 */

// Create a review
// payload = { movieId, rating, reviewText }
export const createReview = async (payload) => {
  const res = await API.post("/reviews", payload);
  return res.data;
};

// Get all reviews for a movie
export const getReviewsByMovie = async (movieId) => {
  const res = await API.get(`/reviews/movie/${movieId}`);
  return res.data;
};

// Update a review
// payload = { rating, reviewText }
export const updateReview = async (reviewId, payload) => {
  const res = await API.put(`/reviews/${reviewId}`, payload);
  return res.data;
};

// Delete a review
export const deleteReview = async (reviewId) => {
  const res = await API.delete(`/reviews/${reviewId}`);
  return res.data;
};
