const List = require("../models/List");

// CREATE LIST
exports.createList = async (req, res) => {
  try {
    const { title, description, movies } = req.body;

    const list = await List.create({
      user: req.userId,
      title,
      description,
      movies: movies || [],
    });

    res.status(201).json({
      message: "List created successfully",
      list,
    });

  } catch (error) {
    res.status(500).json({ message: "Error creating list" });
  }
};

// GET ALL LISTS OF A USER
exports.getUserLists = async (req, res) => {
  try {
    const userId = req.params.id;

    const lists = await List.find({ user: userId }).sort({ createdAt: -1 });

    res.json(lists);

  } catch (error) {
    res.status(500).json({ message: "Error fetching lists" });
  }
};

// ADD MOVIE TO LIST
exports.addMovieToList = async (req, res) => {
  try {
    const { movieId } = req.body; // TMDB movie ID
    const listId = req.params.listId;

    const list = await List.findOne({ _id: listId, user: req.userId });

    if (!list) {
      return res.status(404).json({ message: "List not found or unauthorized" });
    }

    if (!list.movies.includes(movieId)) {
      list.movies.push(movieId);
    }

    await list.save();

    res.json({
      message: "Movie added to list",
      list,
    });

  } catch (error) {
    res.status(500).json({ message: "Error adding movie to list" });
  }
};

// REMOVE MOVIE FROM LIST
exports.removeMovieFromList = async (req, res) => {
  try {
    const { movieId } = req.body;
    const listId = req.params.listId;

    const list = await List.findOne({ _id: listId, user: req.userId });

    if (!list) {
      return res.status(404).json({ message: "List not found or unauthorized" });
    }

    list.movies = list.movies.filter((m) => m !== movieId);

    await list.save();

    res.json({
      message: "Movie removed from list",
      list,
    });

  } catch (error) {
    res.status(500).json({ message: "Error removing movie from list" });
  }
};

// DELETE LIST
exports.deleteList = async (req, res) => {
  try {
    const listId = req.params.listId;

    const list = await List.findOneAndDelete({ _id: listId, user: req.userId });

    if (!list) {
      return res.status(404).json({ message: "List not found or unauthorized" });
    }

    res.json({ message: "List deleted successfully" });

  } catch (error) {
    res.status(500).json({ message: "Error deleting list" });
  }
};
