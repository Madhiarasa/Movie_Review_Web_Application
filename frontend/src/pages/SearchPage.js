import { useState } from "react";
import {
  Box,
  TextField,
  Typography,
  CircularProgress,
} from "@mui/material";

import { searchMovies } from "../api/movieApi";
import MovieGrid from "../components/MovieGrid";

const SearchPage = () => {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [movies, setMovies] = useState([]);

  const handleSearch = async (e) => {
    const value = e.target.value;
    setQuery(value);

    if (value.trim() === "") {
      setMovies([]);
      return;
    }

    setLoading(true);
    const results = await searchMovies(value);
    setMovies(results);
    setLoading(false);
  };

  return (
    <Box sx={{ padding: "20px" }}>
      
      <Typography variant="h4" fontWeight="bold" sx={{ marginBottom: "20px" }}>
        Search Movies
      </Typography>

      <TextField
        fullWidth
        placeholder="Search for a movie..."
        value={query}
        onChange={handleSearch}
        sx={{
          marginBottom: "20px",
          background: "white",
          borderRadius: "6px",
        }}
      />

      {loading && <CircularProgress />}

      {!loading && movies.length === 0 && query.length > 0 && (
        <Typography>No results found.</Typography>
      )}

      {movies.length > 0 && <MovieGrid movies={movies} />}
    </Box>
  );
};

export default SearchPage;
