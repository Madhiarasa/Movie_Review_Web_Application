// frontend/src/api/followApi.js
import API from "./api";

/**
 * Follow related API functions
 */

// FOLLOW a user
export const followUser = async (userId) => {
  const res = await API.post(`/follow/${userId}`);
  return res.data;
};

// UNFOLLOW a user
export const unfollowUser = async (userId) => {
  const res = await API.delete(`/follow/${userId}`);
  return res.data;
};

// GET list of followers for a user
export const getFollowers = async (userId) => {
  const res = await API.get(`/follow/followers/${userId}`);
  return res.data;
};

// GET list of users the user is following
export const getFollowing = async (userId) => {
  const res = await API.get(`/follow/following/${userId}`);
  return res.data;
};
