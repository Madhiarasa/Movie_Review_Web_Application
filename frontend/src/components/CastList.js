import { Box, Typography } from "@mui/material";
import { getFullPosterPath } from "../utils/imageHelper";

const CastList = ({ cast }) => {
  return (
    <Box sx={{ display: "flex", overflowX: "scroll", paddingBottom: 2 }}>

      {cast.slice(0, 15).map((actor) => (
        <Box
          key={actor.cast_id}
          sx={{
            marginRight: "15px",
            width: "120px",
            textAlign: "center",
          }}
        >
          <img
            src={`https://image.tmdb.org/t/p/w185${actor.profile_path}`}
            alt={actor.name}
            style={{
              width: "100%",
              height: "160px",
              borderRadius: "8px",
              objectFit: "cover",
            }}
          />

          <Typography sx={{ marginTop: "5px", fontWeight: "bold" }}>
            {actor.name}
          </Typography>

          <Typography sx={{ color: "gray" }}>
            {actor.character}
          </Typography>
        </Box>
      ))}

    </Box>
  );
};

export default CastList;
