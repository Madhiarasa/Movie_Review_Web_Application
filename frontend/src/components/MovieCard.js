import { Card, CardMedia, CardActionArea, Typography, Box } from "@mui/material";
import { Link } from "react-router-dom";
import { getFullPosterPath } from "../utils/imageHelper";

const MovieCard = ({ movie }) => {
  const id = movie.id || movie.tmdbId; // TMDB ID
  const poster = movie.poster_path || movie.poster;
  const title = movie.title;
  const release = movie.release_date || movie.releaseDate;

  return (
    <Card sx={{ borderRadius: "10px", background: "#1c1c1c" }}>
      <CardActionArea component={Link} to={`/movie/${id}`}>
        <CardMedia
          component="img"
          height="300"
          image={getFullPosterPath(poster)}
          alt={title}
          sx={{ objectFit: "cover" }}
        />

        <Box sx={{ padding: "10px" }}>
          <Typography 
            variant="body1" 
            sx={{ color: "white", fontWeight: "bold" }}
          >
            {title}
          </Typography>

          <Typography variant="body2" sx={{ color: "gray" }}>
            {release ? release.slice(0, 4) : ""}
          </Typography>
        </Box>
      </CardActionArea>
    </Card>
  );
};

export default MovieCard;
