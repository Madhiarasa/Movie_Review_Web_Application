import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { Box, Typography, Button, Divider } from "@mui/material";

import { getUserProfile } from "../api/authApi";
import { getFollowers, getFollowing, followUser, unfollowUser } from "../api/followApi";
import { getUserDiaryEntries } from "../api/diaryApi";
import { getUserLists } from "../api/listApi";

import ReviewCard from "../components/ReviewCard";
import MovieGrid from "../components/MovieGrid";
import { useAuth } from "../hooks/useAuth";

const ProfilePage = () => {
  const { id } = useParams(); // userId from URL
  const { user: loggedUser } = useAuth();

  const [user, setUser] = useState(null);
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);
  const [lists, setLists] = useState([]);
  const [diary, setDiary] = useState([]);
  const [reviews, setReviews] = useState([]); // We will load reviews later

  const isOwnProfile = loggedUser?._id === id;

  useEffect(() => {
    loadProfileInfo();
  }, [id]);

  const loadProfileInfo = async () => {
    const userData = await getUserProfile(id);
    setUser(userData);

    setFollowers(await getFollowers(id));
    setFollowing(await getFollowing(id));
    setLists(await getUserLists(id));
    setDiary(await getUserDiaryEntries(id));

    // We will populate later when Review API is extended
    setReviews(userData.reviews || []);
  };

  const handleFollow = async () => {
    await followUser(id);
    loadProfileInfo();
  };

  const handleUnfollow = async () => {
    await unfollowUser(id);
    loadProfileInfo();
  };

  if (!user) return <Typography>Loading...</Typography>;

  return (
    <Box sx={{ padding: "20px" }}>
      {/* USER INFO */}
      <Typography variant="h3" fontWeight="bold" sx={{ marginBottom: "10px" }}>
        {user.name}
      </Typography>

      {/* Followers / Following */}
      <Typography sx={{ color: "gray", marginBottom: "20px" }}>
        Followers: {followers.length} • Following: {following.length}
      </Typography>

      {/* Follow / Unfollow button */}
      {!isOwnProfile && (
        followers.some((f) => f._id === loggedUser?._id) ? (
          <Button variant="outlined" onClick={handleUnfollow} sx={{ marginBottom: "20px" }}>
            Unfollow
          </Button>
        ) : (
          <Button variant="contained" onClick={handleFollow} sx={{ marginBottom: "20px" }}>
            Follow
          </Button>
        )
      )}

      <Divider sx={{ margin: "20px 0" }} />

      {/* USER'S DIARY */}
      <Typography variant="h5" sx={{ marginBottom: "10px" }}>
        Diary Entries
      </Typography>
      {diary.length === 0 ? (
        <Typography sx={{ color: "gray" }}>No diary entries yet.</Typography>
      ) : (
        <MovieGrid movies={diary.map((d) => d.movie)} />
      )}

      <Divider sx={{ margin: "20px 0" }} />

      {/* USER'S LISTS */}
      <Typography variant="h5" sx={{ marginBottom: "10px" }}>
        Lists
      </Typography>
      {lists.length === 0 ? (
        <Typography sx={{ color: "gray" }}>No lists created yet.</Typography>
      ) : (
        lists.map((list) => (
          <Typography 
            key={list._id}
            sx={{ marginBottom: "10px", fontSize: "18px", cursor: "pointer" }}
          >
            • {list.title} ({list.movies.length} movies)
          </Typography>
        ))
      )}

      <Divider sx={{ margin: "20px 0" }} />

      {/* USER REVIEWS */}
      <Typography variant="h5" sx={{ marginBottom: "10px" }}>
        Reviews
      </Typography>
      {reviews.length === 0 ? (
        <Typography sx={{ color: "gray" }}>No reviews written yet.</Typography>
      ) : (
        reviews.map((review) => <ReviewCard key={review._id} review={review} />)
      )}
    </Box>
  );
};

export default ProfilePage;
