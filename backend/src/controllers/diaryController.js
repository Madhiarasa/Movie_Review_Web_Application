const DiaryEntry = require("../models/DiaryEntry");

// CREATE DIARY ENTRY
exports.addDiaryEntry = async (req, res) => {
  try {
    const { movieId, note, dateWatched } = req.body;

    if (!movieId || !dateWatched) {
      return res.status(400).json({ message: "movieId and dateWatched are required" });
    }

    const entry = await DiaryEntry.create({
      user: req.userId,
      movieId,
      note,
      dateWatched,
    });

    res.status(201).json({
      message: "Diary entry added",
      entry,
    });

  } catch (error) {
    res.status(500).json({ message: "Error adding diary entry" });
  }
};

// GET USER DIARY ENTRIES
exports.getDiaryEntries = async (req, res) => {
  try {
    const userId = req.params.id;

    const entries = await DiaryEntry.find({ user: userId })
      .sort({ dateWatched: -1 });

    res.json(entries);

  } catch (error) {
    res.status(500).json({ message: "Error fetching diary entries" });
  }
};

// UPDATE DIARY ENTRY
exports.updateDiaryEntry = async (req, res) => {
  try {
    const entryId = req.params.id;
    const { note, dateWatched } = req.body;

    const entry = await DiaryEntry.findOne({ _id: entryId, user: req.userId });

    if (!entry) {
      return res.status(404).json({ message: "Diary entry not found or unauthorized" });
    }

    entry.note = note ?? entry.note;
    entry.dateWatched = dateWatched ?? entry.dateWatched;

    await entry.save();

    res.json({
      message: "Diary entry updated",
      entry,
    });

  } catch (error) {
    res.status(500).json({ message: "Error updating diary entry" });
  }
};

// DELETE DIARY ENTRY
exports.deleteDiaryEntry = async (req, res) => {
  try {
    const entryId = req.params.id;

    const entry = await DiaryEntry.findOneAndDelete({
      _id: entryId,
      user: req.userId,
    });

    if (!entry) {
      return res.status(404).json({ message: "Diary entry not found or unauthorized" });
    }

    res.json({ message: "Diary entry deleted" });

  } catch (error) {
    res.status(500).json({ message: "Error deleting diary entry" });
  }
};
