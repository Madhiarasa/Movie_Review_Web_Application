import { Card, CardContent, Typography, Box } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";

const ReviewCard = ({ review }) => {
  const { user, rating, reviewText, createdAt } = review;

  return (
    <Card 
      sx={{ 
        marginBottom: "20px", 
        background: "#1c1c1c", 
        color: "white",
        borderRadius: "10px"
      }}
    >
      <CardContent>
        
        {/* User Name */}
        <Typography 
          variant="h6" 
          sx={{ fontWeight: "bold" }}
        >
          {user?.name || "Unknown User"}
        </Typography>

        {/* Rating Stars */}
        <Box sx={{ display: "flex", alignItems: "center", margin: "5px 0" }}>
          {[...Array(rating)].map((_, i) => (
            <StarIcon key={i} sx={{ color: "gold" }} />
          ))}
        </Box>

        {/* Review Text */}
        <Typography variant="body1" sx={{ marginBottom: "10px" }}>
          {reviewText}
        </Typography>

        {/* Date */}
        <Typography variant="caption" sx={{ color: "gray" }}>
          {new Date(createdAt).toLocaleDateString()}
        </Typography>

      </CardContent>
    </Card>
  );
};

export default ReviewCard;
