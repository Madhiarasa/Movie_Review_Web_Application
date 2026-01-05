// frontend/src/api/diaryApi.js
import API from "./api";

/**
 * Diary related API functions
 */

// ADD a diary entry
// payload = { movieId, note, dateWatched }
export const addDiaryEntry = async (payload) => {
  const res = await API.post("/diary", payload);
  return res.data;
};

// GET all diary entries for a user
export const getUserDiaryEntries = async (userId) => {
  const res = await API.get(`/diary/user/${userId}`);
  return res.data;
};

// UPDATE a diary entry
// payload = { note, dateWatched }
export const updateDiaryEntry = async (entryId, payload) => {
  const res = await API.put(`/diary/${entryId}`, payload);
  return res.data;
};

// DELETE a diary entry
export const deleteDiaryEntry = async (entryId) => {
  const res = await API.delete(`/diary/${entryId}`);
  return res.data;
};
