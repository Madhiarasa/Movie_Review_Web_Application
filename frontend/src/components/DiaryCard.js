import { Card, CardContent, Typography, Box } from "@mui/material";
import { Link } from "react-router-dom";
import { getFullPosterPath, getYear } from "../utils/imageHelper";

const DiaryCard = ({ entry }) => {
  const movie = entry.movie;

  return (
    <Card
      sx={{
        marginBottom: "20px",
        background: "#1c1c1c",
        color: "white",
        borderRadius: "12px",
        display: "flex",
        padding: "10px"
      }}
    >
      {/* Movie Poster */}
      <Box sx={{ width: "120px", marginRight: "15px" }}>
        <Link to={`/movie/${movie?.tmdbId || movie?.id}`}>
          <img
            src={getFullPosterPath(movie?.poster_path || movie?.poster)}
            alt={movie?.title}
            style={{
              width: "100%",
              borderRadius: "8px",
              objectFit: "cover"
            }}
          />
        </Link>
      </Box>

      {/* Diary Details */}
      <CardContent sx={{ flex: 1 }}>
        
        {/* Movie Title */}
        <Typography
          variant="h6"
          component={Link}
          to={`/movie/${movie?.tmdbId || movie?.id}`}
          sx={{ 
            textDecoration: "none",
            color: "white",
            fontWeight: "bold"
          }}
        >
          {movie?.title}{" "}
          <Typography component="span" sx={{ color: "gray" }}>
            ({getYear(movie?.release_date || movie?.releaseDate)})
          </Typography>
        </Typography>

        {/* Date Watched */}
        <Typography sx={{ color: "skyblue", marginTop: "5px" }}>
          Watched on: {new Date(entry.dateWatched).toLocaleDateString()}
        </Typography>

        {/* Notes */}
        {entry.note && (
          <Typography sx={{ marginTop: "10px" }}>
            {entry.note}
          </Typography>
        )}

      </CardContent>
    </Card>
  );
};

export default DiaryCard;
