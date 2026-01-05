// frontend/src/api/listApi.js
import API from "./api";

/**
 * List related API functions
 */

// CREATE a new list
// payload = { title, description, movies: [] }
export const createList = async (payload) => {
  const res = await API.post("/lists", payload);
  return res.data;
};

// GET all lists for a user
export const getUserLists = async (userId) => {
  const res = await API.get(`/lists/user/${userId}`);
  return res.data;
};

// ADD movie to a list
// payload = { movieId }
export const addMovieToList = async (listId, payload) => {
  const res = await API.put(`/lists/${listId}/add`, payload);
  return res.data;
};

// REMOVE movie from a list
// payload = { movieId }
export const removeMovieFromList = async (listId, payload) => {
  const res = await API.put(`/lists/${listId}/remove`, payload);
  return res.data;
};

// DELETE a list
export const deleteList = async (listId) => {
  const res = await API.delete(`/lists/${listId}`);
  return res.data;
};
