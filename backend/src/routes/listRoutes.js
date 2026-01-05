const express = require("express");
const router = express.Router();

const auth = require("../middleware/authMiddleware");
const {
  createList,
  getUserLists,
  addMovieToList,
  removeMovieFromList,
  deleteList,
} = require("../controllers/listController");

// CREATE LIST
router.post("/", auth, createList);

// GET LISTS OF A USER
router.get("/user/:id", getUserLists);

// ADD MOVIE TO LIST
router.put("/:listId/add", auth, addMovieToList);

// REMOVE MOVIE FROM LIST
router.put("/:listId/remove", auth, removeMovieFromList);

// DELETE LIST
router.delete("/:listId", auth, deleteList);

module.exports = router;
