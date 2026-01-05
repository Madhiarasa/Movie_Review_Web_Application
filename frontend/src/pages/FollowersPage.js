import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

import { Box, Typography, Divider } from "@mui/material";
import { getFollowers } from "../api/followApi";

const FollowersPage = () => {
  const { id } = useParams(); // user ID from URL
  const [followers, setFollowers] = useState([]);

  useEffect(() => {
    loadFollowers();
  }, [id]);

  const loadFollowers = async () => {
    const data = await getFollowers(id);
    setFollowers(data);
  };

  return (
    <Box sx={{ padding: "20px" }}>
      <Typography variant="h4" fontWeight="bold" sx={{ marginBottom: "20px" }}>
        Followers
      </Typography>

      <Divider sx={{ marginBottom: "20px" }} />

      {followers.length === 0 ? (
        <Typography>No followers yet.</Typography>
      ) : (
        followers.map((follower) => (
          <Typography
            key={follower._id}
            component={Link}
            to={`/user/${follower._id}`}
            sx={{
              display: "block",
              color: "skyblue",
              marginBottom: "12px",
              fontSize: "18px",
              textDecoration: "none",
            }}
          >
            {follower.name}
          </Typography>
        ))
      )}
    </Box>
  );
};

export default FollowersPage;
