import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { getMovieDetails, getMovieCast, getSimilarMovies } from "../api/movieApi";
import { getReviewsByMovie } from "../api/reviewApi";

import ReviewForm from "../components/ReviewForm";
import ReviewCard from "../components/ReviewCard";
import AddToDiaryButton from "../components/AddToDiaryButton";
import AddToListButton from "../components/AddToListButton";

import CastList from "../components/CastList";
import MovieGrid from "../components/MovieGrid"; // For similar movies

import { 
  Box, 
  Typography, 
  Grid, 
  Divider 
} from "@mui/material";

import { 
  getFullPosterPath, 
  getFullBackdropPath, 
  getYear 
} from "../utils/imageHelper";

const MoviePage = () => {
  const { id } = useParams(); // TMDB movie ID
  
  const [movie, setMovie] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [cast, setCast] = useState([]);               // <-- Added
  const [similar, setSimilar] = useState([]);         // <-- Added

  useEffect(() => {
    loadMovie();
    loadReviews();
    loadCast();                                       // <-- Added
    loadSimilar();                                    // <-- Added
  }, [id]);

  const loadMovie = async () => {
    const data = await getMovieDetails(id);
    setMovie(data);
  };

  const loadReviews = async () => {
    const data = await getReviewsByMovie(id);
    setReviews(data);
  };

  // Load Cast
  const loadCast = async () => {
    const data = await getMovieCast(id);
    setCast(data);
  };

  // Load Similar Movies
  const loadSimilar = async () => {
    const data = await getSimilarMovies(id);
    setSimilar(data);
  };

  if (!movie) return <Typography>Loading...</Typography>;

  return (
    <Box>
      {/* Movie Backdrop */}
      <Box
        sx={{
          height: "400px",
          backgroundImage: `url(${getFullBackdropPath(movie.backdrop_path)})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "brightness(0.6)",
          marginBottom: "20px",
        }}
      />

      <Grid container spacing={3} sx={{ padding: "20px" }}>
        
        {/* Left Side: Poster */}
        <Grid item xs={12} md={4}>
          <img
            src={getFullPosterPath(movie.poster_path)}
            alt={movie.title}
            style={{ width: "100%", borderRadius: "10px" }}
          />
        </Grid>

        {/* Right Side: Details */}
        <Grid item xs={12} md={8}>
          <Typography variant="h3" fontWeight="bold">
            {movie.title}
          </Typography>

          <Typography variant="h5" color="gray" sx={{ marginBottom: "20px" }}>
            {getYear(movie.release_date)}
          </Typography>

          {/* Add to Diary Button */}
          <AddToDiaryButton movieId={id} onAdded={loadMovie} />

          {/* Add to List Button */}
          <AddToListButton movieId={id} />

          <Typography variant="body1" sx={{ marginBottom: "20px" }}>
            {movie.overview}
          </Typography>

          <Divider sx={{ margin: "20px 0" }} />

          {/* CAST SECTION */}
          <Typography variant="h6" sx={{ marginBottom: "10px" }}>
            Cast
          </Typography>

          <CastList cast={cast} />

          <Divider sx={{ margin: "20px 0" }} />

          {/* SIMILAR MOVIES SECTION */}
          <Typography variant="h6" sx={{ marginBottom: "10px" }}>
            Similar Movies
          </Typography>

          {similar.length === 0 ? (
            <Typography color="gray">No similar movies found.</Typography>
          ) : (
            <MovieGrid movies={similar} />
          )}

          <Divider sx={{ margin: "20px 0" }} />

          {/* Review Section */}
          <Typography variant="h6" sx={{ marginBottom: "10px" }}>
            Write a Review
          </Typography>

          <ReviewForm movieId={id} onReviewAdded={loadReviews} />

          <Divider sx={{ margin: "20px 0" }} />

          <Typography variant="h6" sx={{ marginBottom: "10px" }}>
            Reviews
          </Typography>
        </Grid>
      </Grid>

      {/* Reviews List */}
      <Box sx={{ padding: "20px" }}>
        {reviews.length === 0 && (
          <Typography>No reviews yet.</Typography>
        )}

        {reviews.map((review) => (
          <ReviewCard key={review._id} review={review} />
        ))}
      </Box>
    </Box>
  );
};

export default MoviePage;
