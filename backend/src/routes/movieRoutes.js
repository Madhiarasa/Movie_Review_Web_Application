const express = require("express");
const router = express.Router();

const movieController = require("../controllers/movieController");

// Routes

// Trending
router.get("/trending", movieController.getTrending);

// Popular (your custom endpoint)
router.get("/popular", movieController.getPopular);

// TMDB Popular (real TMDB API)
router.get("/tmdb/popular", movieController.getPopularMovies);

// Top Rated
router.get("/top-rated", movieController.getTopRated);

// Upcoming
router.get("/upcoming", movieController.getUpcoming);

// Search Movies
router.get("/search", movieController.searchMovies);

// Get Movie Cast
router.get("/:id/cast", movieController.getMovieCast);

// Get Similar Movies
router.get("/:id/similar", movieController.getSimilarMovies);

// Get Movie Details (must be last, so it doesn’t catch other routes)
router.get("/:id", movieController.getMovieDetails);

module.exports = router;
