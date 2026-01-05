import { useEffect, useState } from "react";
import { getUpcomingMovies } from "../api/movieApi";
import MovieGrid from "../components/MovieGrid";

import { Box, Typography } from "@mui/material";

const UpcomingMoviesPage = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    loadUpcoming();
  }, []);

  const loadUpcoming = async () => {
    const data = await getUpcomingMovies();
    setMovies(data);
  };

  return (
    <Box sx={{ padding: "20px" }}>
      <Typography variant="h4" sx={{ mb: 3 }}>
        🎬 Upcoming Movies
      </Typography>

      <MovieGrid movies={movies} />
    </Box>
  );
};

export default UpcomingMoviesPage;
