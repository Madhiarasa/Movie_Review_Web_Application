const express = require("express");
const router = express.Router();

const auth = require("../middleware/authMiddleware");

const {
  addDiaryEntry,
  getDiaryEntries,
  updateDiaryEntry,
  deleteDiaryEntry,
} = require("../controllers/diaryController");

// ADD DIARY ENTRY
router.post("/", auth, addDiaryEntry);

// GET DIARY ENTRIES OF A USER
router.get("/user/:id", getDiaryEntries);

// UPDATE DIARY ENTRY
router.put("/:id", auth, updateDiaryEntry);

// DELETE DIARY ENTRY
router.delete("/:id", auth, deleteDiaryEntry);

module.exports = router;
