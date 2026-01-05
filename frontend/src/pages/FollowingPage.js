import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

import { Box, Typography, Divider } from "@mui/material";
import { getFollowing } from "../api/followApi";

const FollowingPage = () => {
  const { id } = useParams(); // user ID from URL
  const [following, setFollowing] = useState([]);

  useEffect(() => {
    loadFollowing();
  }, [id]);

  const loadFollowing = async () => {
    const data = await getFollowing(id);
    setFollowing(data);
  };

  return (
    <Box sx={{ padding: "20px" }}>
      <Typography variant="h4" fontWeight="bold" sx={{ marginBottom: "20px" }}>
        Following
      </Typography>

      <Divider sx={{ marginBottom: "20px" }} />

      {following.length === 0 ? (
        <Typography>This user is not following anyone.</Typography>
      ) : (
        following.map((user) => (
          <Typography
            key={user._id}
            component={Link}
            to={`/user/${user._id}`}
            sx={{
              display: "block",
              color: "skyblue",
              marginBottom: "12px",
              fontSize: "18px",
              textDecoration: "none",
            }}
          >
            {user.name}
          </Typography>
        ))
      )}
    </Box>
  );
};

export default FollowingPage;
