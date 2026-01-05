const tmdb = require("../services/tmdbService");
const axios = require("axios");
const { baseUrl, apiKey } = require("../config/tmdb");

// ----------------------------
// CAST
// ----------------------------
exports.getMovieCast = async (req, res) => {
  try {
    const { id } = req.params;
    const url = `${baseUrl}/movie/${id}/credits?api_key=${apiKey}`;
    const response = await axios.get(url);

    res.json(response.data.cast);
  } catch (error) {
    res.status(500).json({ message: "Failed to load cast" });
  }
};

// ----------------------------
// SIMILAR MOVIES
// ----------------------------
exports.getSimilarMovies = async (req, res) => {
  try {
    const { id } = req.params;
    const url = `${baseUrl}/movie/${id}/similar?api_key=${apiKey}`;
    const response = await axios.get(url);

    res.json(response.data.results);
  } catch (error) {
    res.status(500).json({ message: "Failed to load similar movies" });
  }
};

// ----------------------------
// TMDB DIRECT ENDPOINT: Popular (for frontend popular page)
// ----------------------------
exports.getPopularMovies = async (req, res) => {
  try {
    const url = `${baseUrl}/movie/popular?api_key=${apiKey}`;
    const response = await axios.get(url);

    res.json(response.data.results);
  } catch (error) {
    res.status(500).json({ message: "Failed to load TMDB popular movies" });
  }
};

// ----------------------------
// WRAPPED TMDB Functions (your service)
// ----------------------------
exports.getTrending = async (req, res) => {
  try {
    const movies = await tmdb.getTrendingMovies();
    res.json(movies);
  } catch (err) {
    res.status(500).json({ message: "Error fetching trending movies" });
  }
};

exports.getPopular = async (req, res) => {
  try {
    const movies = await tmdb.getPopularMovies();
    res.json(movies);
  } catch (err) {
    res.status(500).json({ message: "Error fetching popular movies" });
  }
};

exports.getTopRated = async (req, res) => {
  try {
    const movies = await tmdb.getTopRatedMovies();
    res.json(movies);
  } catch (err) {
    res.status(500).json({ message: "Error fetching top rated movies" });
  }
};

exports.getUpcoming = async (req, res) => {
  try {
    const movies = await tmdb.getUpcomingMovies();
    res.json(movies);
  } catch (err) {
    res.status(500).json({ message: "Error fetching upcoming movies" });
  }
};

exports.searchMovies = async (req, res) => {
  try {
    const query = req.query.query;
    const movies = await tmdb.searchMovies(query);
    res.json(movies);
  } catch (err) {
    res.status(500).json({ message: "Error searching movies" });
  }
};

// ----------------------------
// MOVIE DETAILS
// ----------------------------
exports.getMovieDetails = async (req, res) => {
  try {
    const movieId = req.params.id;
    const details = await tmdb.getMovieDetails(movieId);
    res.json(details);
  } catch (err) {
    res.status(500).json({ message: "Error fetching movie details" });
  }
};
