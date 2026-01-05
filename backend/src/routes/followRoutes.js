const express = require("express");
const router = express.Router();

const auth = require("../middleware/authMiddleware");

const {
  followUser,
  unfollowUser,
  getFollowers,
  getFollowing,
} = require("../controllers/followController");

// FOLLOW a user
router.post("/:id", auth, followUser);

// UNFOLLOW a user
router.delete("/:id", auth, unfollowUser);

// GET all followers of a user
router.get("/followers/:id", getFollowers);

// GET all users someone is following
router.get("/following/:id", getFollowing);

module.exports = router;
