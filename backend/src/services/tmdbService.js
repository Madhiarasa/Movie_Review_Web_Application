const axios = require("axios");
const { baseUrl, apiKey } = require("../config/tmdb");

// Helper to format URL
const makeUrl = (path, params = "") => {
  return `${baseUrl}${path}?api_key=${apiKey}${params}`;
};

// Fetch Trending Movies
exports.getTrendingMovies = async () => {
  const url = makeUrl("/trending/movie/week");
  const response = await axios.get(url);
  return response.data.results;
};

// Fetch Movie Details by ID
exports.getMovieDetails = async (movieId) => {
  const url = makeUrl(`/movie/${movieId}`);
  const response = await axios.get(url);
  return response.data;
};

// Search Movies by Query
exports.searchMovies = async (query) => {
  const url = makeUrl("/search/movie", `&query=${encodeURIComponent(query)}`);
  const response = await axios.get(url);
  return response.data.results;
};

// Popular Movies
exports.getPopularMovies = async () => {
  const url = makeUrl("/movie/popular");
  const response = await axios.get(url);
  return response.data.results;
};

// Top Rated Movies
exports.getTopRatedMovies = async () => {
  const url = makeUrl("/movie/top_rated");
  const response = await axios.get(url);
  return response.data.results;
};

// Upcoming Movies
exports.getUpcomingMovies = async () => {
  const url = makeUrl("/movie/upcoming");
  const response = await axios.get(url);
  return response.data.results;
};
