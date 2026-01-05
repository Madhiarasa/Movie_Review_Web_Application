import { useEffect, useState } from "react";
import { Typography, Box } from "@mui/material";

import { 
  getTrendingMovies, 
  getPopularMovies, 
  getTopRatedMovies, 
  getUpcomingMovies 
} from "../api/movieApi";

import MovieGrid from "../components/MovieGrid";

const HomePage = () => {
  const [trending, setTrending] = useState([]);
  const [popular, setPopular] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const [upcoming, setUpcoming] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setTrending(await getTrendingMovies());
    setPopular(await getPopularMovies());
    setTopRated(await getTopRatedMovies());
    setUpcoming(await getUpcomingMovies());
  };

  return (
    <Box sx={{ padding: "20px" }}>
      <Typography variant="h4" sx={{ marginBottom: "20px" }}>
        Trending Movies
      </Typography>
      <MovieGrid movies={trending} />

      <Typography variant="h4" sx={{ margin: "20px 0" }}>
        Popular Movies
      </Typography>
      <MovieGrid movies={popular} />

      <Typography variant="h4" sx={{ margin: "20px 0" }}>
        Top Rated Movies
      </Typography>
      <MovieGrid movies={topRated} />

      <Typography variant="h4" sx={{ margin: "20px 0" }}>
        Upcoming Movies
      </Typography>
      <MovieGrid movies={upcoming} />
    </Box>
  );
};

export default HomePage;
