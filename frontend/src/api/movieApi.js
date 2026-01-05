// frontend/src/api/movieApi.js
import API from "./api";

/**
 * Movie related API functions
 * These call your backend, which fetches data from TMDB.
 */

// Get trending movies
export const getTrendingMovies = async () => {
  const res = await API.get("/movies/trending");
  return res.data;
};

// Get popular movies
export const getPopularMovies = async () => {
  const res = await API.get("/movies/popular");
  return res.data;
};

// Get top-rated movies
export const getTopRatedMovies = async () => {
  const res = await API.get("/movies/top-rated");
  return res.data;
};

// Get upcoming movies
export const getUpcomingMovies = async () => {
  const res = await API.get("/movies/upcoming");
  return res.data;
};

// Search movies
export const searchMovies = async (query) => {
  const res = await API.get(`/movies/search?query=${query}`);
  return res.data;
};

// Get movie details
export const getMovieDetails = async (movieId) => {
  const res = await API.get(`/movies/${movieId}`);
  return res.data;
};

// Get movie cast
export const getMovieCast = async (movieId) => {
  const res = await API.get(`/movies/${movieId}/cast`);
  return res.data;
};

// Get similar movies
export const getSimilarMovies = async (movieId) => {
  const res = await API.get(`/movies/${movieId}/similar`);
  return res.data;
};
