import { Grid } from "@mui/material";
import MovieCard from "./MovieCard";

const MovieGrid = ({ movies }) => {
  return (
    <Grid container spacing={2}>
      {movies?.map((movie) => (
        <Grid item xs={6} sm={4} md={3} lg={2} key={movie.id || movie.tmdbId}>
          <MovieCard movie={movie} />
        </Grid>
      ))}
    </Grid>
  );
};

export default MovieGrid;
