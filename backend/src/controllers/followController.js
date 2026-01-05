const Follow = require("../models/Follow");

// FOLLOW A USER
exports.followUser = async (req, res) => {
  try {
    const followerId = req.userId;      // the logged-in user
    const followingId = req.params.id;   // user to follow

    if (followerId === followingId) {
      return res.status(400).json({ message: "You cannot follow yourself" });
    }

    // Check if already following
    const alreadyFollowing = await Follow.findOne({
      follower: followerId,
      following: followingId,
    });

    if (alreadyFollowing) {
      return res.status(400).json({ message: "Already following this user" });
    }

    const follow = await Follow.create({
      follower: followerId,
      following: followingId,
    });

    res.status(201).json({
      message: "User followed successfully",
      follow,
    });

  } catch (error) {
    res.status(500).json({ message: "Error following user" });
  }
};

// UNFOLLOW A USER
exports.unfollowUser = async (req, res) => {
  try {
    const followerId = req.userId;
    const followingId = req.params.id;

    const followRecord = await Follow.findOneAndDelete({
      follower: followerId,
      following: followingId,
    });

    if (!followRecord) {
      return res.status(400).json({ message: "Not following this user" });
    }

    res.json({ message: "User unfollowed successfully" });

  } catch (error) {
    res.status(500).json({ message: "Error unfollowing user" });
  }
};

// GET FOLLOWERS OF A USER
exports.getFollowers = async (req, res) => {
  try {
    const userId = req.params.id;

    const followers = await Follow.find({ following: userId })
      .populate("follower", "name email avatar");

    res.json(followers);

  } catch (error) {
    res.status(500).json({ message: "Error fetching followers" });
  }
};

// GET USERS FOLLOWED BY A USER
exports.getFollowing = async (req, res) => {
  try {
    const userId = req.params.id;

    const following = await Follow.find({ follower: userId })
      .populate("following", "name email avatar");

    res.json(following);

  } catch (error) {
    res.status(500).json({ message: "Error fetching following list" });
  }
};
